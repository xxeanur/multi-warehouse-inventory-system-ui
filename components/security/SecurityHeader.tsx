import { Box, Typography, Chip } from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

export default function SecurityHeader() {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
          Güvenlik & Erişim
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          Hesap şifresi, iki faktörlü doğrulama ve cihaz oturumlarını yönetin.
        </Typography>
      </Box>
      <Chip
        icon={<GppGoodOutlinedIcon fontSize="small" />}
        label="Hesap Güvenli"
        sx={{
          bgcolor: "#F0FDF4",
          color: "#059669",
          fontWeight: 700,
          borderRadius: 2,
          px: 1,
          "& .MuiChip-icon": { color: "#059669" },
        }}
      />
    </Box>
  );
}