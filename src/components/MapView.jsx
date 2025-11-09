import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ lands }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {lands.map((land, idx) => (
          <Marker key={idx} position={[land.lat, land.lng]}>
            <Popup>{land.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
