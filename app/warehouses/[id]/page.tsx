"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

import LayoutWrapper from "../../../components/LayoutWrapper";
import AddWarehouseModal from "@/components/warehouses/AddWarehouseModal";
import AddZoneModal from "@/components/warehouses/AddZoneModal";

// Seçilen depoya ait sahte Raf Verileri
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
];

export default function WarehouseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);

  const warehouse = {
    name: "Konya Şube Deposu",
    id: params.id,
    city: "Konya",
    manager: "Ahmet Yılmaz",
    status: "Aktif",
    totalCapacity: 5000,
    filledCapacity: 3200,
  };

  const getProgressColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
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
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: mapped.color,
          }}
        />
        <Typography
          sx={{ fontSize: "0.75rem", fontWeight: 600, color: mapped.color }}
        >
          {mapped.label}
        </Typography>
      </Box>
    );
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 4 },
          pb: 8,
          pt: 2,
        }}
      >
        {/* ÜST KARŞILAMA ALANI (HERO SECTION) - YENİDEN TASARLANDI */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 2, sm: 0 }, // Boşluğu biraz daha kıstık
            pt: 1, // Navbar'a daha yakın
            mb: 4, // Aşağıdaki kartla olan mesafeyi de biraz daralttık
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, sm: 2 },
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => router.back()}
              sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #EBEBEB",
                width: 36, // Biraz daha kompakt
                height: 36,
                borderRadius: "50%",
                "&:hover": { bgcolor: "#F7F7F9" },
              }}
            >
              <ArrowBackIcon sx={{ color: "#222222", fontSize: 18 }} />
            </IconButton>

            <Box>
              <Typography
                variant="h5" // Başlığı biraz daha kompakt yaptık
                sx={{
                  fontWeight: 800,
                  color: "#222222",
                  letterSpacing: "-0.3px",
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                {warehouse.name}
              </Typography>

              {/* Detayları tek satıra daha şık sığdırıyoruz */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                  mt: 0.5,
                }}
              >
                <Chip
                  label={warehouse.status}
                  sx={{
                    bgcolor: "#F0FDF4",
                    color: "#047857",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    height: 20,
                    fontSize: "0.65rem",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#717171",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    fontWeight: 600,
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                  {warehouse.city}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#717171",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    fontWeight: 600,
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                  {warehouse.manager}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Düzenle Butonu */}
          <Box>
            <Button
              onClick={() => setIsEditModalOpen(true)}
              startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: "#222222",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "underline",
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              Düzenle
            </Button>
          </Box>
        </Box>

        {/* Modern Özet Kartı */}
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
              {Math.round(
                (warehouse.filledCapacity / warehouse.totalCapacity) * 100,
              )}
              %
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(warehouse.filledCapacity / warehouse.totalCapacity) * 100}
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
            sx={{
              mt: 2,
              color: "#717171",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            Mevcut <strong>{warehouse.totalCapacity.toLocaleString()}</strong>{" "}
            birimlik alanın{" "}
            <strong>{warehouse.filledCapacity.toLocaleString()}</strong> birimi
            dolu.
          </Typography>
        </Card>

        {/* RAF HARİTASI */}
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
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#222222", mb: 1 }}
              >
                Raf Düzeni
              </Typography>
              <Typography sx={{ color: "#717171", fontWeight: 500 }}>
                Depo içindeki tüm blokların anlık doluluk oranları.
              </Typography>
            </Box>

            <Button
              onClick={() => setIsZoneModalOpen(true)}
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
            {mockZones.map((zone, index) => (
              <Box key={index}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#222222",
                    mb: 2.5,
                    pb: 1,
                    borderBottom: "1px solid #EBEBEB",
                  }}
                >
                  {zone.zoneName}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 3,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#222222",
                            letterSpacing: "-0.5px",
                          }}
                        >
                          {shelf.id}
                        </Typography>
                        {getStatusIndicator(shelf.status)}
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "#717171",
                              fontSize: "0.85rem",
                            }}
                          >
                            {shelf.current} / {shelf.capacity}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#222222",
                              fontSize: "0.85rem",
                            }}
                          >
                            {Math.round((shelf.current / shelf.capacity) * 100)}
                            %
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(shelf.current / shelf.capacity) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#F7F7F9",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: getProgressColor(
                                shelf.current,
                                shelf.capacity,
                              ),
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        <AddWarehouseModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
        <AddZoneModal
          open={isZoneModalOpen}
          onClose={() => setIsZoneModalOpen(false)}
        />
      </Box>
    </LayoutWrapper>
  );
}
