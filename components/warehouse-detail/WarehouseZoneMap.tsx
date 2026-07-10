"use client";

import { Box, Typography, Button, Stack, LinearProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// TİP GÜNCELLENDİ: Raf (Shelf) artık hacim ve ağırlık değerleri taşıyor
interface Shelf {
  id: string;
  maxVolumeCm3: number;
  currentVolumeCm3: number;
  maxWeightKg: number;
  currentWeightKg: number;
  status: string;
}

interface Zone {
  zoneName: string;
  shelves: Shelf[];
}

interface WarehouseZoneMapProps {
  zones: Zone[];
  onAddZone: () => void;
}

// Doluluk rengi hacme göre hesaplanıyor
const getProgressColor = (currentVol: number, maxVol: number) => {
  const percentage = (currentVol / maxVol) * 100;
  if (percentage >= 90) return "#FF385C";
  if (percentage >= 70) return "#F5A623";
  return "#10B981";
};

const getStatusIndicator = (status: string) => {
  const statusMap: Record<string, { color: string; label: string }> = {
    Dolu: { color: "#FF385C", label: "Dolu" },
    Kritik: { color: "#F5A623", label: "Kritik" },
    Boş: { color: "#10B981", label: "Müsait" },
    Normal: { color: "#4B5563", label: "Normal" },
  };
  const mapped = statusMap[status] || statusMap.Normal;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: mapped.color }} />
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: mapped.color }}>
        {mapped.label}
      </Typography>
    </Box>
  );
};

export default function WarehouseZoneMap({ zones, onAddZone }: WarehouseZoneMapProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "flex-end" },
          gap: { xs: 2, sm: 0 },
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#222222", mb: 1 }}>
            Raf Düzeni
          </Typography>
          <Typography sx={{ color: "#717171", fontWeight: 500 }}>
            Depo içindeki tüm blokların hacimsel doluluk oranları.
          </Typography>
        </Box>

        <Button
          onClick={onAddZone}
          variant="contained"
          startIcon={<AddIcon />}
          disableElevation
          sx={{
            bgcolor: "#172C4A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 3,
            px: { xs: 2.5, sm: 3.5 },
            py: 1,
            width: { xs: "100%", sm: "auto" },
            boxShadow: "0px 4px 14px rgba(23, 44, 74, 0.15)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "#0F1D33",
              boxShadow: "0px 6px 20px rgba(23, 44, 74, 0.25)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Yeni Blok Ekle
        </Button>
      </Box>

      <Stack spacing={5}>
        {zones.map((zone, index) => (
          <Box key={index}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#222222", mb: 2.5, pb: 1, borderBottom: "1px solid #EBEBEB" }}
            >
              {zone.zoneName}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                gap: 3,
              }}
            >
              {zone.shelves.map((shelf) => (
                <Box
                  key={shelf.id}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid #EBEBEB",
                    bgcolor: "#FFFFFF",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#222222",
                      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#222222", letterSpacing: "-0.5px" }}>
                      {shelf.id}
                    </Typography>
                    {getStatusIndicator(shelf.status)}
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 600, color: "#717171", fontSize: "0.75rem" }}>
                        Hacim (cm³)
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: "#222222", fontSize: "0.75rem" }}>
                        {Math.round((shelf.currentVolumeCm3 / shelf.maxVolumeCm3) * 100)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(shelf.currentVolumeCm3 / shelf.maxVolumeCm3) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        mb: 1.5,
                        bgcolor: "#F7F7F9",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: getProgressColor(shelf.currentVolumeCm3, shelf.maxVolumeCm3),
                          borderRadius: 3,
                        },
                      }}
                    />

                    {/* Ağırlık Bilgisi Alt Metin Olarak Eklendi */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <Typography sx={{ fontWeight: 500, color: "#9CA3AF", fontSize: "0.7rem" }}>
                         Ağırlık Yükü
                       </Typography>
                       <Typography sx={{ fontWeight: 600, color: "#4B5563", fontSize: "0.7rem" }}>
                         {shelf.currentWeightKg} / {shelf.maxWeightKg} kg
                       </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}