"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";
import LayoutWrapper from "../../../components/LayoutWrapper";
import AddIcon from "@mui/icons-material/Add";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddWarehouseModal from "@/components/warehouses/AddWarehouseModal";

// Arayüz için sahte depo ve konum verileri
const mockWarehouses = [
  {
    id: 1,
    name: "Merkez Depo",
    location: "Konya, Selçuklu",
    manager: "Ahmet Yılmaz",
    maxVolume: 100000,
    currentVolume: 75000,
    status: "Aktif",
    zones: [
      { name: "Zone A (Elektronik)", sections: 4, shelves: 24, filled: "%80" },
      { name: "Zone B (Aksesuar)", sections: 2, shelves: 12, filled: "%60" },
    ],
  },
  {
    id: 2,
    name: "Teknokent Şube",
    location: "Konya, Teknokent",
    manager: "Ayşe Kaya",
    maxVolume: 50000,
    currentVolume: 12000,
    status: "Aktif",
    zones: [
      { name: "Zone A (Karma)", sections: 3, shelves: 15, filled: "%24" },
    ],
  },
  {
    id: 3,
    name: "Ankara Transfer Merkezi",
    location: "Ankara, Yenimahalle",
    manager: "Mehmet Demir",
    maxVolume: 150000,
    currentVolume: 142000,
    status: "Dolu",
    zones: [
      { name: "Zone A (Gelen)", sections: 5, shelves: 50, filled: "%95" },
      { name: "Zone B (Giden)", sections: 5, shelves: 50, filled: "%94" },
    ],
  },
];

export default function WarehousesPage() {
  const router = useRouter();
  const [IsAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCardClick = (id: number | string) => {
    // Tıklanan deponun ID'si ile dinamik sayfaya yönlendir
    router.push(`/warehouses/${id}`);
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Üst Kısım: Başlık ve Ekle Butonu */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
            >
              Depo ve Konum Yönetimi
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Depoların hacimsel doluluk oranlarını ve raf kırılımlarını takip
              edin
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            onClick={() => setIsAddModalOpen(true)}
            sx={{
              bgcolor: "#172C4A",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "#0F1D33" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Yeni Depo Tanımla
          </Button>
        </Box>

        {/* Depo Kartları (Grid Yapısı) */}
        <Grid container spacing={3}>
          {mockWarehouses.map((warehouse) => {
            const fillPercentage =
              (warehouse.currentVolume / warehouse.maxVolume) * 100;
            const isCritical = fillPercentage > 90;

            return (
              <Grid size={{ xs: 12, md: 6, lg: 6 }} key={warehouse.id}>
                <Card
                  onClick={() => handleCardClick(warehouse.id)}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#172C4A",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            bgcolor: "#F3F4F6",
                            p: 1,
                            borderRadius: 2,
                            color: "#172C4A",
                          }}
                        >
                          <WarehouseOutlinedIcon />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              color: "#111827",
                              lineHeight: 1.2,
                            }}
                          >
                            {warehouse.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mt: 0.5,
                            }}
                          >
                            <LocationOnOutlinedIcon
                              sx={{ fontSize: 14, color: "#6B7280" }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: "#6B7280" }}
                            >
                              {warehouse.location}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Chip
                        label={warehouse.status}
                        size="small"
                        sx={{
                          bgcolor: isCritical ? "#FEF2F2" : "#ECFCCB",
                          color: isCritical ? "#DC2626" : "#4D7C0F",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>

                    {/* Hacim İlerleme Çubuğu */}
                    <Box sx={{ mt: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 600, color: "#374151" }}
                        >
                          Hacim Doluluk Oranı
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: isCritical ? "#DC2626" : "#111827",
                          }}
                        >
                          %{fillPercentage.toFixed(1)}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={fillPercentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "#F3F4F6",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: isCritical ? "#EF4444" : "#172C4A",
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "#9CA3AF", display: "block", mt: 1 }}
                      >
                        {warehouse.currentVolume.toLocaleString()} /{" "}
                        {warehouse.maxVolume.toLocaleString()} cm³ kullanılıyor
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <AddWarehouseModal
          open={IsAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Box>
    </LayoutWrapper>
  );
}
