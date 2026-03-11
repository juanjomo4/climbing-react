import { useState } from "react";
import { Link } from "react-router-dom";
import { useShoes } from "../../hooks/useShoes";
import type { ClimbingShoe } from "../../types";

export default function ShoesPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const { shoes, loading, error } = useShoes({
    search: search || undefined,
    minPrice,
    maxPrice,
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg animate-pulse">
          Cargando pies de gato...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Cabecera */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">
          Equipamiento
        </p>
        <h1 className="text-5xl font-black uppercase tracking-tight text-gray-900 leading-none">
          Pies de Gato
        </h1>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8  p-4 rounded-xl">
        <input
          type="text"
          placeholder="Buscar marca o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Precio mín."
          value={minPrice ?? ""}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Precio máx."
          value={maxPrice ?? ""}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contador */}
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">
        {shoes.length} modelos
      </p>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {shoes.map((shoe: ClimbingShoe) => (
          <Link to={`/shoes/${shoe.id}`} key={shoe.id} className="group block">
            <div className="bg-[#1d1f20]/95 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300">
              {/* Badge TOP */}
              {shoe.destacado && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white px-2.5 py-1 rounded-full">
                    Destacado
                  </span>
                </div>
              )}

              {/* Imagen flotante sobre fondo oscuro */}
              <div>
                {shoe.imagenUrl ? (
                  <img
                    src={`/${shoe.imagenUrl}`}
                    alt={`${shoe.marca} ${shoe.modelo}`}
                    className="relative object-contain rounded-2xl"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <span className="text-5xl opacity-20">👟</span>
                )}
              </div>

              {/* Info + badges de rigidez */}
              <div className="px-4 pb-4 pt-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">
                  {shoe.marca}
                </p>
                <h2 className="text-sm font-bold text-white mb-3 leading-tight">
                  {shoe.modelo}
                </h2>

                {/* Fila precio + badge rigidez */}
                <div className="flex items-end justify-between">
                  <p className="text-xl font-black text-white">
                    {shoe.precio.toFixed(2)}
                    <span className="text-xs font-normal text-gray-400 ml-0.5">
                      €
                    </span>
                  </p>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      shoe.rigidez === "blanda"
                        ? "bg-green-500/20 text-green-400"
                        : shoe.rigidez === "media"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {shoe.rigidez}
                  </span>
                </div>

                {/* Cierre + tallas */}
                <div className="flex gap-2 mt-2.5">
                  <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-md">
                    {shoe.tipoCierre}
                  </span>
                  <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-md">
                    EU {shoe.tallaMinima}–{shoe.tallaMaxima}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
