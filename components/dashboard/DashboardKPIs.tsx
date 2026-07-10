import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

export default function DashboardKPIs() {
  const cardStyle = {
    borderRadius: 3,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
    border: "1px solid #E5E7EB",
    height: "100%",
  };

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {/* Kart 1: Kayıtlı Ürün */}
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

      {/* Kart 2: Kritik Stok */}
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

      {/* Kart 3: İşlem Hacmi */}
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
  );
}
