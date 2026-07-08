"use client";

import { Box, Card, Typography, Grid, LinearProgress, Chip, Stack, Tooltip, IconButton } from "@mui/material";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Sahte Raf Verileri
const mockZones = [
  {
    zoneName: "A Bloğu - Elektronik",
    shelves: [
      { id: "A-01", capacity: 100, current: 85, status: "Kritik" },
      { id: "A-02", capacity: 100, current: 40, status: "Normal" },
      { id: "A-03", capacity: 100, current: 95, status: "Dolu" },
      { id: "A-04", capacity: 100, current: 10, status: "Boş" },
    ],
  },
  {
    zoneName: "B Bloğu - Aksesuar",
    shelves: [
      { id: "B-01", capacity: 200, current: 150, status: "Normal" },
      { id: "B-02", capacity: 200, current: 190, status: "Kritik" },
      { id: "B-03", capacity: 200, current: 0, status: "Boş" },
    ],
  },
  {
    zoneName: "C Bloğu - Hacimli Ürünler",
    shelves: [
      { id: "C-01", capacity: 50, current: 50, status: "Dolu" },
      { id: "C-02", capacity: 50, current: 20, status: "Normal" },
    ],
  },
];

export default function ShelfLayout() {
  // Doluluk oranına göre renk ve stil belirleme
  const getProgressColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "#DC2626"; // Kırmızı (Dolu)
    if (percentage >= 70) return "#F59E0B"; // Sarı (Kritik)
    return "#10B981"; // Yeşil (Müsait)
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Dolu":
        return <Chip label="Tamamen Dolu" size="small" sx={{ bgcolor: "#FEF2F2", color: "#DC2626", fontWeight: 700, fontSize: "0.65rem", height: 20 }} />;
      case "Kritik":
        return <Chip label="Az Yer Kaldı" size="small" sx={{ bgcolor: "#FFFBEB", color: "#D97706", fontWeight: 700, fontSize: "0.65rem", height: 20 }} />;
      case "Boş":
        return <Chip label="Müsait" size="small" sx={{ bgcolor: "#ECFDF5", color: "#059669", fontWeight: 700, fontSize: "0.65rem", height: 20 }} />;
      default:
        return <Chip label="Normal" size="small" sx={{ bgcolor: "#F3F4F6", color: "#4B5563", fontWeight: 700, fontSize: "0.65rem", height: 20 }} />;
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Panel Başlığı ve Açıklaması */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
            Anlık Raf Doluluk Haritası
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Depo içindeki blokların ve rafların anlık kapasite durumlarını izleyin.
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#10B981" }} />
            <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600 }}>Müsait</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#F59E0B" }} />
            <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600 }}>Kritik</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#DC2626" }} />
            <Typography variant="caption" sx={{ color: "#4B5563", fontWeight: 600 }}>Dolu</Typography>
          </Box>
        </Box>
      </Box>

      {/* Grid Yapısı (Bloklar ve Raflar) */}
      <Stack spacing={4}>
        {mockZones.map((zone, index) => (
          <Box key={index}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#374151", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ViewInArOutlinedIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
              {zone.zoneName}
            </Typography>
            <Grid container spacing={2}>
              {zone.shelves.map((shelf) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={shelf.id}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      p: 2.5, 
                      borderRadius: 3, 
                      border: "1px solid #E5E7EB", 
                      transition: "0.2s",
                      cursor: "pointer",
                      "&:hover": { borderColor: "#172C4A", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                          {shelf.id}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6B7280", mt: 0.5, display: "block" }}>
                          Kapasite: {shelf.capacity} Birim
                        </Typography>
                      </Box>
                      {getStatusChip(shelf.status)}
                    </Box>

                    {/* Şık Progress Bar */}
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#374151" }}>
                          {shelf.current} Dolu
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: "#9CA3AF" }}>
                          {Math.round((shelf.current / shelf.capacity) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(shelf.current / shelf.capacity) * 100} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: "#F3F4F6",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: getProgressColor(shelf.current, shelf.capacity),
                            borderRadius: 3
                          }
                        }} 
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}