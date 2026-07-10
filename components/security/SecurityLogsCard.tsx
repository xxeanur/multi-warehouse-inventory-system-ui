import { Box, Card, Typography } from "@mui/material";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

export default function SecurityLogsCard() {
  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  return (
    <Card elevation={0} sx={sectionCardStyle}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 800,
          color: "#111827",
          mb: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <HistoryOutlinedIcon sx={{ color: "#172C4A" }} /> Son Güvenlik
        Etkinlikleri
      </Typography>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ pl: 2, borderLeft: "2px solid #E5E7EB" }}>
          <Typography
            variant="caption"
            sx={{ color: "#9CA3AF", fontWeight: 600 }}
          >
            Bugün 12:45
          </Typography>
          <Typography variant="body2" sx={{ color: "#374151", mt: 0.5 }}>
            Hesaba başarılı giriş yapıldı (Chrome - Windows)
          </Typography>
        </Box>
        <Box sx={{ pl: 2, borderLeft: "2px solid #E5E7EB" }}>
          <Typography
            variant="caption"
            sx={{ color: "#9CA3AF", fontWeight: 600 }}
          >
            9 Temmuz 2026, 09:15
          </Typography>
          <Typography variant="body2" sx={{ color: "#374151", mt: 0.5 }}>
            Şifre değiştirme işlemi yapıldı
          </Typography>
        </Box>
        <Box sx={{ pl: 2, borderLeft: "2px solid #EF4444" }}>
          <Typography
            variant="caption"
            sx={{ color: "#EF4444", fontWeight: 600 }}
          >
            7 Temmuz 2026, 18:30
          </Typography>
          <Typography variant="body2" sx={{ color: "#374151", mt: 0.5 }}>
            Başarısız giriş denemesi (Bilinmeyen IP)
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
