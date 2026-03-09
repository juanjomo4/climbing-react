import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHighlightedShoes } from "../../services/shoeService";
import { getHighlightedNews } from "../../services/newsService";
import type { ClimbingShoe, News } from "../../types";

export default function HomePage() {
  const [highlightedShoes, setHighlightedShoes] = useState<ClimbingShoe[]>([]);
  const [highlightedNews, setHighlightedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlighted = async () => {
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

    fetchHighlighted();
  }, []);

  return (
    <div>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            🧗 Climbing Gym
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Encuentra los mejores rocódromos, descubre el equipo perfecto y
            mantente al día con las últimas noticias de escalada.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/gyms"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Ver rocódromos
            </Link>
            <Link
              to="/shoes"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Ver pies de gato
            </Link>
          </div>
        </div>
      </section>

      {/* ── ZAPATOS DESTACADOS ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            👟 Pies de gato destacados
          </h2>
          <Link to="/shoes" className="text-blue-500 text-sm hover:underline">
            Ver todos →
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedShoes.map((shoe: ClimbingShoe) => (
              <Link to={`/shoes/${shoe.id}`} key={shoe.id} className="block">
                <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer h-full">
                  {/* Imagen */}
                  {shoe.imagenUrl && (
                    <img
                      src={`/${shoe.imagenUrl}`}
                      alt={`${shoe.marca} ${shoe.modelo}`}
                      className="w-full h-40 object-contain mb-4 rounded-lg bg-gray-50 p-2"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {shoe.marca}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {shoe.modelo}
                      </h3>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                      ⭐ Destacado
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-blue-600 mb-3">
                    {shoe.precio.toFixed(2)} €
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      🔒 {shoe.tipoCierre}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {shoe.rigidez}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── NOTICIAS DESTACADAS ────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              📰 Noticias destacadas
            </h2>
            <Link to="/news" className="text-blue-500 text-sm hover:underline">
              Ver todas →
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-400">Cargando...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlightedNews.map((item: News) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow hover:shadow-md transition flex flex-col overflow-hidden"
                >
                  {item.imagenUrl && (
                    <img
                      src={item.imagenUrl}
                      alt={item.titulo}
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full w-fit mb-3">
                      {item.categoria}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm flex-1 line-clamp-3">
                      {item.resumen}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-3 mt-4">
                      <span>✍️ {item.autor}</span>
                      <span>
                        {new Date(item.fechaPublicacion).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
