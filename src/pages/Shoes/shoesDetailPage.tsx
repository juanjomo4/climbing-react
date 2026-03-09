import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getShoeById } from "../../services/shoeService";
import type { ClimbingShoe } from "../../types";

export default function ShoeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [shoe, setShoe] = useState<ClimbingShoe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchShoe = async () => {
      try {
        setLoading(true);
        const response = await getShoeById(Number(id));
        setShoe(response.data);
      } catch (err) {
        setError("Pie de gato no encontrado");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShoe();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando...</p>
      </div>
    );

  if (error || !shoe)
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <p className="text-red-500 text-lg">
          {error ?? "Producto no encontrado"}
        </p>
        <button
          onClick={() => navigate("/shoes")}
          className="text-blue-500 hover:underline"
        >
          ← Volver al catálogo
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-blue-500">
          Inicio
        </Link>
        <span className="mx-2">›</span>
        <Link to="/shoes" className="hover:text-blue-500">
          Pies de gato
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{shoe.modelo}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Imagen */}
          <div className="md:w-2/5 bg-gray-100 flex items-center justify-center p-8 min-h-64">
            {shoe.imagenUrl ? (
              <img
                src={`/${shoe.imagenUrl}`}
                alt={`${shoe.marca} ${shoe.modelo}`}
                className="max-h-72 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <span className="text-8xl">👟</span>
            )}
          </div>

          {/* Info principal */}
          <div className="md:w-3/5 p-8">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                {shoe.marca}
              </p>
              {shoe.destacado && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                  ⭐ Destacado
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
              {shoe.modelo}
            </h1>

            <p className="text-4xl font-bold text-blue-600 mb-6">
              {shoe.precio.toFixed(2)} €
            </p>

            {shoe.descripcion && (
              <p className="text-gray-600 leading-relaxed mb-6">
                {shoe.descripcion}
              </p>
            )}

            {/* Especificaciones */}
            <div className="border-t pt-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Especificaciones
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <dt className="text-xs text-gray-400 mb-1">Tipo de cierre</dt>
                  <dd className="font-medium text-gray-800 capitalize">
                    🔒 {shoe.tipoCierre}
                  </dd>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <dt className="text-xs text-gray-400 mb-1">Rigidez</dt>
                  <dd
                    className={`font-medium capitalize ${
                      shoe.rigidez === "blanda"
                        ? "text-green-600"
                        : shoe.rigidez === "media"
                          ? "text-blue-600"
                          : "text-red-600"
                    }`}
                  >
                    {shoe.rigidez}
                  </dd>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <dt className="text-xs text-gray-400 mb-1">
                    Tallas disponibles
                  </dt>
                  <dd className="font-medium text-gray-800">
                    📏 {shoe.tallaMinima} — {shoe.tallaMaxima} EU
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Botón volver */}
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline text-sm"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}
