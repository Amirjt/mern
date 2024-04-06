import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const position = [51.505, -0.09];

const Map = () => {
  return (
    <div className="relative">
      <MapContainer
        className="h-[600px] w-[400px] md:w-[500px]"
        style={{
          marginTop: "30px",
          borderRadius: "15px",
        }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>This is our area</Popup>
        </Marker>
      </MapContainer>
      <div className="absolute -bottom-14 right-1/3 z-[1000] flex w-1/3 flex-col gap-3 rounded-lg border border-muted bg-white p-3 shadow-md">
        <h4 className="text-sm font-semibold"> Our store </h4>
        <p className="text-sm">39252 Winchester Rd #127</p>
        <p className="text-sm text-main">(951) 600-9226</p>
        <Link className="text-sm text-main underline">About us</Link>
      </div>
    </div>
  );
};

export default Map;
