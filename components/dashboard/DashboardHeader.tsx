"use client";

import { Box, Typography } from "@mui/material";

interface DashboardHeaderProps {
  totalWarehouses: number;
  totalActiveStocks: number;
}

export default function DashboardHeader({ totalWarehouses, totalActiveStocks }: DashboardHeaderProps) {
  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}>
          Sistem Özeti
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          Depo hacimleri ve anlık stok durumları
        </Typography>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block" }}>
          Aktif Depo: <strong style={{ color: "#111827" }}>{totalWarehouses}</strong>
        </Typography>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block" }}>
          Fiziksel Stok: <strong style={{ color: "#111827" }}>{totalActiveStocks.toLocaleString('tr-TR')} Adet</strong>
        </Typography>
      </Box>
    </Box>
  );
}