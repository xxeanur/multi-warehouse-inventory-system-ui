import { Box, Typography, Button } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function SettingsHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}
        >
          Sistem Konfigürasyonu
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          API erişimleri, sunucu bağlantıları ve dış entegrasyon parametrelerini
          yönetin.
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<SaveOutlinedIcon />}
        sx={{
          bgcolor: "#172C4A",
          "&:hover": { bgcolor: "#0F1D33" },
          py: 1.2,
          px: 4,
          fontWeight: 600,
          borderRadius: 2,
          textTransform: "none",
        }}
      >
        Tüm Ayarları Kaydet
      </Button>
    </Box>
  );
}
