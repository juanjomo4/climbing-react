import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGyms } from "../../hooks/useGyms";
import type { Gym } from "../../types";

// Coordenadas centradas en España
const SPAIN_CENTER: [number, number] = [40.416775, -3.70379];

export default function GymsPage() {
  // useState es como declarar propiedades en el componente Angular
  const [filters, setFilters] = useState({
    country: "España",
    city: "",
    type: "",
    name: "",
  });

  // Aquí usamos nuestro custom hook, equivalente a inyectar el servicio
  const { gyms, loading, error } = useGyms(filters);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando rocódromos...</p>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🧗 Rocódromos</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          name="name"
          placeholder="Buscar por nombre..."
          value={filters.name}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad..."
          value={filters.city}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="country"
          placeholder="País..."
          value={filters.country}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los tipos</option>
          <option value="BOULDER">Boulder</option>
          <option value="ROUTES">Vías</option>
          <option value="MIXED">Mixto</option>
        </select>
      </div>

      {/* Mapa */}
      <div
        className="rounded-xl overflow-hidden shadow-lg mb-8"
        style={{ height: "450px" }}
      >
        <MapContainer
          center={SPAIN_CENTER}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {gyms.map((gym: Gym) => (
            <Marker key={gym.id} position={[gym.latitude, gym.longitude]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{gym.name}</p>
                  <p>
                    {gym.city}, {gym.country}
                  </p>
                  <p className="text-gray-500">{gym.type}</p>
                  {gym.website && (
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Ver web →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Lista de tarjetas */}
      <p className="text-gray-500 mb-4">{gyms.length} rocódromos encontrados</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym: Gym) => (
          <div
            key={gym.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {gym.name}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  gym.type === "BOULDER"
                    ? "bg-orange-100 text-orange-700"
                    : gym.type === "ROUTES"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {gym.type}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-3">
              📍 {gym.city}, {gym.country}
            </p>
            <p className="text-gray-400 text-xs mb-3">{gym.address}</p>
            {gym.website && (
              <a
                href={gym.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm hover:underline"
              >
                Visitar web →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
