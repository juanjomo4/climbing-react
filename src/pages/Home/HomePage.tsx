import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getHighlightedShoes } from "../../services/shoeService";
import { getHighlightedNews } from "../../services/newsService";
import type { ClimbingShoe, News } from "../../types";

export default function HomePage() {
  const [highlightedShoes, setHighlightedShoes] = useState<ClimbingShoe[]>([]);
  const [highlightedNews, setHighlightedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación de entrada del hero, igual que el fade-in de Massively
    const timer = setTimeout(() => setHeroVisible(true), 100);

    const fetchData = async () => {
      try {
        const [resShoes, resNews] = await Promise.all([
          getHighlightedShoes(),
          getHighlightedNews(),
        ]);
        setHighlightedShoes(resShoes.data);
        setHighlightedNews(resNews.data);
      } catch (err) {
        console.error("Error cargando datos destacados", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => clearTimeout(timer);
  }, []);

  // Primera noticia destacada → card featured
  const featuredNews = highlightedNews[0];
  // El resto → grid
  const restNews = highlightedNews.slice(1);

  return (
    <div className="bg-[#1d1f20] text-white min-h-screen">
      {/* ── HERO (estilo #intro de Massively) ─────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url(/images/getting-started/escalada-boulder.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-[#1d1f20]/80" />

        {/* Contenido hero con animación fade-in */}
        <div
          className={`relative z-10 text-center px-6 transition-all duration-1000 ${
            heroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-widest mb-6 leading-none">
            Climbing
            <br />
            <span className="text-gray-400">Gym</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Tu guía de escalada indoor en España. Rocódromos, equipamiento y las
            últimas noticias del sector.
          </p>
          <button
            onClick={() =>
              contentRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-block border-2 border-white text-white font-bold uppercase tracking-widest px-10 py-4 hover:bg-white hover:text-[#1d1f20] transition-all duration-300 cursor-pointer"
          >
            Explorar →
          </button>
        </div>

        {/* Flecha scroll hacia abajo */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── CONTENIDO PRINCIPAL ────────────────────────────── */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-20">
        {/* ── NOTICIA FEATURED (estilo .post.featured) ───── */}
        {!loading && featuredNews && (
          <article className="mb-20">
            <header className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                {new Date(featuredNews.fechaPublicacion).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 mb-4 leading-tight">
                {featuredNews.titulo}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {featuredNews.resumen}
              </p>
            </header>

            {/* Imagen grande ancho completo */}
            {featuredNews.imagenUrl && (
              <div className="w-full h-96 overflow-hidden mb-8">
                <img
                  src={featuredNews.imagenUrl}
                  alt={featuredNews.titulo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}

            <div className="text-center">
              <Link
                to="/news"
                className="inline-block border-2 border-white text-white font-bold uppercase tracking-widest px-8 py-3 hover:bg-white hover:text-[#1d1f20] transition-all duration-300 text-sm"
              >
                Leer más →
              </Link>
            </div>
          </article>
        )}

        {/* Separador */}
        <hr className="border-white/10 mb-20" />

        {/* ── GRID NOTICIAS (estilo .posts) ──────────────── */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              📰 Noticias
            </h2>
            <Link
              to="/news"
              className="text-gray-400 hover:text-white transition text-sm uppercase tracking-wider"
            >
              Ver todas →
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {restNews.map((item: News) => (
                <article
                  key={item.id}
                  className="border border-white/10 hover:border-white/30 transition-all duration-300 group"
                >
                  {/* Imagen */}
                  {item.imagenUrl && (
                    <div className="overflow-hidden h-52">
                      <img
                        src={item.imagenUrl}
                        alt={item.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <header className="mb-3">
                      <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                        {new Date(item.fechaPublicacion).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <h3 className="text-xl font-black uppercase mt-1 leading-tight group-hover:text-gray-300 transition">
                        {item.titulo}
                      </h3>
                    </header>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.resumen}
                    </p>
                    <Link
                      to="/news"
                      className="text-xs uppercase tracking-widest border border-white/30 px-4 py-2 hover:bg-white hover:text-[#1d1f20] transition-all duration-300 inline-block"
                    >
                      Leer más
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Separador */}
        <hr className="border-white/10 mb-20" />

        {/* ── GRID ZAPATOS DESTACADOS ─────────────────────── */}
        <section>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              👟 Pies de Gato
            </h2>
            <Link
              to="/shoes"
              className="text-gray-400 hover:text-white transition text-sm uppercase tracking-wider"
            >
              Ver todos →
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {highlightedShoes.map((shoe: ClimbingShoe) => (
                <Link
                  to={`/shoes/${shoe.id}`}
                  key={shoe.id}
                  className="block group"
                >
                  <article className="border border-white/10 hover:border-white/30 transition-all duration-300">
                    {/* Imagen */}
                    <div className="overflow-hidden h-52 bg-white/5 flex items-center justify-center">
                      {shoe.imagenUrl ? (
                        <img
                          src={`/${shoe.imagenUrl}`}
                          alt={`${shoe.marca} ${shoe.modelo}`}
                          className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      ) : (
                        <span className="text-8xl">👟</span>
                      )}
                    </div>

                    <div className="p-6">
                      <header className="mb-3">
                        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                          {shoe.marca}
                        </span>
                        <h3 className="text-xl font-black uppercase mt-1 leading-tight group-hover:text-gray-300 transition">
                          {shoe.modelo}
                        </h3>
                      </header>

                      <div className="flex justify-between items-center">
                        <p className="text-3xl font-black text-white">
                          {shoe.precio.toFixed(2)} €
                        </p>
                        <div className="flex gap-2">
                          <span className="text-xs border border-white/20 text-gray-400 px-2 py-1 uppercase tracking-wider">
                            {shoe.tipoCierre}
                          </span>
                          <span className="text-xs border border-white/20 text-gray-400 px-2 py-1 uppercase tracking-wider">
                            {shoe.rigidez}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
