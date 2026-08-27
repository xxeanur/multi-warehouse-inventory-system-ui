"use client";

import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import { WarehouseOccupancyDto } from "@/types/common/dashboard";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F9FAFB",
      }}
    >
      <Typography sx={{ color: "#6B7280", fontWeight: 600 }}>
        Harita Yükleniyor...
      </Typography>
    </Box>
  ),
});

interface WarehouseMapProps {
  locations: WarehouseOccupancyDto[];
}

export default function WarehouseMap({ locations }: WarehouseMapProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: "250px", sm: "350px" },
        bgcolor: "#F9FAFB",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 2,
          bgcolor: "rgba(255,255,255,0.85)",
          p: 1.5,
          borderRadius: 2,
          backdropFilter: "blur(4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "#374151" }}
        >
          Gerçek Zamanlı Ağ
        </Typography>
        <Typography variant="caption" sx={{ color: "#6B7280" }}>
          Sokak bazlı konumlandırma
        </Typography>
      </Box>
      <MapContent locations={locations} />
    </Box>
  );
}
