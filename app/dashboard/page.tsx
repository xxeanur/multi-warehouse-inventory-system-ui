"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

// Yeni Harita Bileşenini import ediyoruz (Yolunu projene göre ayarla)
import WarehouseMap from "@/components/dashboard/WarehouseMap";

const recentMovements = [
  {
    id: 1,
    type: "INBOUND",
    product: "MacBook Pro M3",
    qty: 50,
    location: "Merkez Depo - Zone A",
    date: "10 dk önce",
  },
  {
    id: 2,
    type: "TRANSFER",
    product: "Dell UltraSharp Monitör",
    qty: 15,
    location: "Merkez -> Konya Şube",
    date: "45 dk önce",
  },
  {
    id: 3,
    type: "OUTBOUND",
    product: "Logitech MX Master 3",
    qty: 2,
    location: "Konya Şube - Raf 4",
    date: "1 saat önce",
  },
  {
    id: 4,
    type: "INBOUND",
    product: "Ergonomik Ofis Koltuğu",
    qty: 20,
    location: "Merkez Depo - Zone C",
    date: "3 saat önce",
  },
  {
    id: 5,
    type: "TRANSFER",
    product: "Type-C Çoklayıcı Hub",
    qty: 100,
    location: "Konya Şube -> Ankara Şube",
    date: "5 saat önce",
  },
];

export default function DashboardPage() {
  const cardStyle = {
    borderRadius: 3,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
    border: "1px solid #E5E7EB",
    height: "100%",
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", pb: 6 }}>
        {/* Sayfa Başlığı */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
          >
            Sistem Özeti
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Depo hacimleri ve anlık stok durumları
          </Typography>
        </Box>

        {/* KPI (Özet) Kartları */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {/* Kart 1 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={cardStyle}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ color: "#6B7280", mb: 1, fontWeight: 600 }}
                    >
                      KAYITLI ÜRÜN ÇEŞİDİ
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: "#111827", fontWeight: 800 }}
                    >
                      1,248
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "#EEF2FF",
                      color: "#4F46E5",
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  >
                    <Inventory2OutlinedIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Kart 2 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{ ...cardStyle, borderColor: "#FECACA", bgcolor: "#FEF2F2" }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ color: "#DC2626", mb: 1, fontWeight: 600 }}
                    >
                      KRİTİK STOK UYARISI
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: "#991B1B", fontWeight: 800 }}
                    >
                      12
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#DC2626",
                        mt: 1,
                        display: "block",
                        lineHeight: 1.2,
                      }}
                    >
                      Minimum seviyenin altına düşen ürünler
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "#FEE2E2",
                      color: "#DC2626",
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  >
                    <WarningAmberIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Kart 3 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={cardStyle}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ color: "#6B7280", mb: 1, fontWeight: 600 }}
                    >
                      GÜNLÜK İŞLEM HACMİ
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: "#111827", fontWeight: 800 }}
                    >
                      342
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#059669",
                        mt: 1,
                        display: "block",
                        fontWeight: 500,
                      }}
                    >
                      +15% düne göre artış
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "#F0FDF4",
                      color: "#059669",
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  >
                    <LocalShippingOutlinedIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ORTA BÖLÜM: Harita ve Doluluk Özeti (YENİ EKLENDİ) */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {/* Sol: Harita (Geniş Alan) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <WarehouseMap />
          </Grid>

          {/* Sağ: Depo Doluluk Özeti */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{ ...cardStyle, display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid #E5E7EB" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  Kapasite Kullanımı
                </Typography>
              </Box>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#374151" }}
                    >
                      Ankara İç Anadolu Hub
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#DC2626" }}
                    >
                      %94
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={94}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "#FEE2E2",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#DC2626",
                        borderRadius: 4,
                      },
                    }}
                  />
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
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#374151" }}
                    >
                      Konya Merkez Depo
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#F59E0B" }}
                    >
                      %80
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "#FEF3C7",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#F59E0B",
                        borderRadius: 4,
                      },
                    }}
                  />
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
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#374151" }}
                    >
                      İstanbul Avrupa Transfer
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#059669" }}
                    >
                      %60
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "#D1FAE5",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#059669",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alt Bölüm: Son Hareketler Listesi */}
        <Card elevation={0} sx={cardStyle}>
          <Box
            sx={{
              px: { xs: 2, sm: 3 },
              py: 2.5,
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#111827" }}
            >
              Son Stok Hareketleri
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {recentMovements.map((movement, index) => (
              <Box key={movement.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    p: { xs: 2, sm: 3 },
                    "&:hover": { bgcolor: "#F9FAFB" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.5, sm: 2 },
                      flexGrow: 1,
                      minWidth: 0,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        bgcolor:
                          movement.type === "INBOUND"
                            ? "#F0FDF4"
                            : movement.type === "OUTBOUND"
                              ? "#FEF2F2"
                              : "#EEF2FF",
                        color:
                          movement.type === "INBOUND"
                            ? "#059669"
                            : movement.type === "OUTBOUND"
                              ? "#DC2626"
                              : "#4F46E5",
                      }}
                    >
                      {movement.type === "INBOUND" && (
                        <ArrowDownwardIcon fontSize="small" />
                      )}
                      {movement.type === "OUTBOUND" && (
                        <ArrowUpwardIcon fontSize="small" />
                      )}
                      {movement.type === "TRANSFER" && (
                        <SyncAltIcon fontSize="small" />
                      )}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontWeight: 600, color: "#111827" }}
                      >
                        {movement.product}
                      </Typography>
                      <Typography
                        variant="caption"
                        noWrap
                        sx={{ color: "#6B7280", display: "block" }}
                      >
                        {movement.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-end", sm: "center" },
                      gap: { xs: 0.5, sm: 4 },
                      flexShrink: 0,
                      ml: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#374151" }}
                    >
                      {movement.type === "OUTBOUND" ? "-" : "+"}
                      {movement.qty} Adet
                    </Typography>
                    <Chip
                      label={movement.type}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.65rem",
                        height: "22px",
                        bgcolor:
                          movement.type === "INBOUND"
                            ? "#D1FAE5"
                            : movement.type === "OUTBOUND"
                              ? "#FEE2E2"
                              : "#E0E7FF",
                        color:
                          movement.type === "INBOUND"
                            ? "#065F46"
                            : movement.type === "OUTBOUND"
                              ? "#991B1B"
                              : "#3730A3",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#9CA3AF",
                        textAlign: "right",
                        minWidth: { sm: "75px" },
                      }}
                    >
                      {movement.date}
                    </Typography>
                  </Box>
                </Box>
                {index !== recentMovements.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </LayoutWrapper>
  );
}
