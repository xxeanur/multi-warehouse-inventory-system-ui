"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, Chip } from "@mui/material";

// Gerçek Enlem (lat) ve Boylam (lng) Koordinatları
const locations = [
  { id: 1, city: "İstanbul", address: "Avrupa Transfer, Arnavutköy", lat: 41.1852, lng: 28.7369, status: "Normal", fill: 60, color: "#10B981" },
  { id: 2, city: "Ankara", address: "İç Anadolu Hub, Yenimahalle", lat: 39.9658, lng: 32.7971, status: "Kritik", fill: 94, color: "#F5A623" },
  { id: 3, city: "Konya", address: "Merkez Depo, Selçuklu", lat: 37.9256, lng: 32.4984, status: "Dolu", fill: 80, color: "#FF385C" },
];

// Standart mavi harita ikonları yerine bizim tasarıma uygun şık yuvarlak (SaaS) pinler üretiyoruz
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

export default function MapContent() {
  return (
    <MapContainer
      center={[39.0, 35.0]} // Haritanın açılışta odaklanacağı merkez (Türkiye'nin ortası)
      zoom={6}
      style={{ width: "100%", height: "100%", zIndex: 1 }}
      zoomControl={false} // Modern durması için zoom tuşlarını gizledik (mouse ile zoom yapılır)
    >
      {/* Çok temiz ve modern SaaS harita teması (CartoDB Positron Açık Tema) */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; CARTO'
      />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={createCustomIcon(loc.color)}
        >
          {/* Pine tıklandığında açılan detay kutucuğu */}
          <Popup>
            <Box sx={{ p: 0.5, minWidth: 150 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", mb: 0.2 }}>
                {loc.city}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 1 }}>
                {loc.address}
              </Typography>
              <Chip
                label={`%${loc.fill} Dolu`}
                size="small"
                sx={{ bgcolor: loc.color + "20", color: loc.color, fontWeight: 700, fontSize: "0.7rem", height: 20 }}
              />
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}