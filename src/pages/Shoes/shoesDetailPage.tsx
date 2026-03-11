import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getShoeById } from "../../services/shoeService";
import type { ClimbingShoe } from "../../types";

const RIGIDEZ_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; bar: number }
> = {
  blanda: {
    label: "Blanda",
    color: "text-green-600",
    bg: "bg-green-500",
    bar: 33,
  },
  media: { label: "Media", color: "text-blue-600", bg: "bg-blue-500", bar: 66 },
  rígida: {
    label: "Rígida",
    color: "text-red-600",
    bg: "bg-red-500",
    bar: 100,
  },
};

export default function ShoesDetailPage() {
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
        <p className="text-gray-400 animate-pulse">Cargando...</p>
      </div>
    );

  if (error || !shoe)
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <p className="text-red-500">{error ?? "Producto no encontrado"}</p>
        <button
          onClick={() => navigate("/shoes")}
          className="text-sm text-gray-500 hover:text-gray-900 underline"
        >
          ← Volver al catálogo
        </button>
      </div>
    );

  const rigidez = RIGIDEZ_CONFIG[shoe.rigidez] ?? {
    label: shoe.rigidez,
    color: "text-gray-600",
    bg: "bg-gray-500",
    bar: 50,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-0">
        <nav className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Link to="/" className="hover:text-gray-700 transition">
            Inicio
          </Link>
          <span>›</span>
          <Link to="/shoes" className="hover:text-gray-700 transition">
            Pies de gato
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-semibold">{shoe.modelo}</span>
        </nav>
      </div>

      {/* Layout principal: info izquierda + imagen derecha */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
        {/* Panel izquierdo: toda la info */}
        <div className="flex flex-col justify-center">
          {/* Marca */}
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-3">
            {shoe.marca}
          </p>

          {/* Nombre */}
          <h1 className="text-5xl font-black text-gray-900 leading-none mb-2 uppercase tracking-tight">
            {shoe.modelo}
          </h1>

          {/* Destacado */}
          {shoe.destacado && (
            <span className="inline-block w-fit text-xs font-bold uppercase tracking-widest bg-orange-100 text-orange-600 px-3 py-1 rounded-full mb-4">
              ⭐ Destacado
            </span>
          )}

          {/* Precio */}
          <p className="text-6xl font-black text-gray-900 mb-6 leading-none">
            {shoe.precio.toFixed(2)}
            <span className="text-2xl font-normal text-gray-400 ml-1">€</span>
          </p>

          {/* Descripción */}
          {shoe.descripcion && (
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm border-l-2 border-gray-200 pl-4">
              {shoe.descripcion}
            </p>
          )}

          {/* Especificaciones */}
          <div className="space-y-3 mb-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4">
              Especificaciones
            </p>

            {/* Cierre */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Tipo de cierre
              </span>
              <span className="text-sm font-semibold text-gray-800 capitalize">
                {shoe.tipoCierre}
              </span>
            </div>

            {/* Tallas */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Tallas EU
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {shoe.tallaMinima} — {shoe.tallaMaxima}
              </span>
            </div>

            {/* Rigidez con barra */}
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Rigidez
                </span>
                <span
                  className={`text-xs font-black uppercase tracking-widest ${rigidez.color}`}
                >
                  {rigidez.label}
                </span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${rigidez.bg}`}
                  style={{ width: `${rigidez.bar}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-gray-300 uppercase tracking-wider">
                  Blanda
                </span>
                <span className="text-[9px] text-gray-300 uppercase tracking-wider">
                  Rígida
                </span>
              </div>
            </div>
          </div>

          {/* Botón volver */}
          <button
            onClick={() => navigate(-1)}
            className="w-fit text-xs text-gray-400 hover:text-gray-700 uppercase tracking-widest transition flex items-center gap-2"
          >
            ← Volver
          </button>
        </div>

        {/* Panel derecho: imagen grande */}
        <div className="relative flex items-center justify-center">
          {/* Fondo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/10 blur-2xl rounded-full" />

          {shoe.imagenUrl ? (
            <img
              src={`/${shoe.imagenUrl}`}
              alt={`${shoe.marca} ${shoe.modelo}`}
              className="relative object-contain rounded-2xl"
              style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <span className="text-9xl opacity-10">👟</span>
          )}
        </div>
      </div>
    </div>
  );
}
