"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { WarehouseOccupancyDto } from "@/types/common/dashboard";
import { useRouter } from "next/navigation";

const getPinColor = (rate: number) => {
  if (rate >= 90) return "#DC2626";
  if (rate >= 70) return "#F59E0B";
  return "#10B981";
};

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 18px; height: 18px;
        border-radius: 50%; border: 3px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

interface MapContentProps {
  locations: WarehouseOccupancyDto[];
}

export default function MapContent({ locations }: MapContentProps) {
  const router = useRouter();

  const validLocations = locations.filter(
    (l) => l.latitude !== null && l.longitude !== null,
  );

  return (
    <MapContainer
      center={[39.0, 35.0]}
      zoom={6}
      style={{ width: "100%", height: "100%", zIndex: 1 }}
      zoomControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
      />

      {validLocations.map((loc) => {
        const color = getPinColor(loc.occupancyRate);
        return (
          <Marker
            key={loc.warehouseId}
            position={[loc.latitude!, loc.longitude!]}
            icon={createCustomIcon(color)}
          >
            <Popup closeButton={false}>
              <Box
                onClick={() => router.push(`/warehouses/${loc.warehouseId}`)}
                sx={{
                  p: 0.5,
                  minWidth: 170,
                  cursor: "pointer",
                  "&:hover .action-arrow": {
                    transform: "translateX(4px)",
                    color: "#172C4A",
                  },
                  "&:hover .title-text": { color: "#172C4A" },
                }}
              >
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    className="title-text"
                    variant="subtitle2"
                    sx={{
                      fontWeight: 800,
                      color: "#111827",
                      mb: 0.75,
                      transition: "color 0.2s",
                    }}
                  >
                    {loc.warehouseName}
                  </Typography>
                  <Chip
                    label={`%${loc.occupancyRate} Dolu`}
                    size="small"
                    sx={{
                      bgcolor: color + "15",
                      color: color,
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: 22,
                      borderRadius: 1.5,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pt: 1.5,
                    borderTop: "1px dashed #E5E7EB",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    Detayları Gör
                  </Typography>
                  <ArrowForwardIcon
                    className="action-arrow"
                    sx={{
                      fontSize: 16,
                      color: "#9CA3AF",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                </Box>
              </Box>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
