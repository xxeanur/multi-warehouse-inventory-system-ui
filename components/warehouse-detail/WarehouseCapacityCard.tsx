"use client";

import { formatVolume } from "@/utils/formatters";
import { Card, Box, Typography, LinearProgress } from "@mui/material";

interface WarehouseCapacityCardProps {
  totalCapacity: number;
  filledCapacity: number;
}

export default function WarehouseCapacityCard({
  totalCapacity,
  filledCapacity,
}: WarehouseCapacityCardProps) {
  const fillPercentage =
    totalCapacity > 0 ? (filledCapacity / totalCapacity) * 100 : 0;
  const safePercentage = Math.min(100, Math.max(0, fillPercentage)); 

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: "1px solid #EBEBEB",
        mb: 6,
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#222222" }}>
          Kapasite Durumu
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#172C4A", letterSpacing: "-1px" }}
        >
          {Math.round(fillPercentage)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={safePercentage} 
        sx={{
          height: 12,
          borderRadius: 6,
          bgcolor: "#F7F7F9",
          "& .MuiLinearProgress-bar": {
            bgcolor: "#172C4A",
            borderRadius: 6,
          },
        }}
      />
      <Typography
        sx={{ mt: 2, color: "#717171", fontWeight: 500, fontSize: "0.9rem" }}
      >
        Mevcut <strong>{formatVolume(totalCapacity)}</strong> hacmin{" "}
        <strong>{formatVolume(filledCapacity)}</strong> kadarı dolu.
      </Typography>
    </Card>
  );
}
