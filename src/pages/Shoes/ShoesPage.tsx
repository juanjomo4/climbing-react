import { useState } from "react";
import { useShoes } from "../../hooks/useShoes";
import type { ClimbingShoe } from "../../types";
import { Link } from "react-router-dom";

export default function ShoesPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  // Los filtros se pasan como valores primitivos, no como objeto,
  // para evitar re-renders innecesarios. El hook los recibe correctamente
  const { shoes, loading, error } = useShoes({
    search: search || undefined,
    minPrice,
    maxPrice,
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando pies de gato...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👟 Pies de Gato</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Precio mínimo..."
          value={minPrice ?? ""}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Precio máximo..."
          value={maxPrice ?? ""}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contador */}
      <p className="text-gray-500 mb-4">
        {shoes.length} pies de gato encontrados
      </p>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoes.map((shoe: ClimbingShoe) => (
          <Link to={`/shoes/${shoe.id}`} key={shoe.id} className="block">
            <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer h-full">
              {/* Cabecera: nombre + badge destacado */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {shoe.marca}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {shoe.modelo}
                  </h2>
                </div>
                {shoe.destacado && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                    ⭐ Destacado
                  </span>
                )}
              </div>

              {/* Precio */}
              <p className="text-2xl font-bold text-blue-600 mb-3">
                {shoe.precio.toFixed(2)} €
              </p>

              {/* Detalles */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  🔒 {shoe.tipoCierre}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    shoe.rigidez === "blanda"
                      ? "bg-green-100 text-green-700"
                      : shoe.rigidez === "media"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {shoe.rigidez}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  📏 {shoe.tallaMinima} - {shoe.tallaMaxima}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
