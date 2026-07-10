import { Box, Card, Typography, Grid, LinearProgress } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function InventoryCountSummary() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid #E5E7EB",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: "#374151" }}
            >
              Mevcut Sayım Dönemi (Temmuz 2026)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#172C4A" }}>
              %68
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={68}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "#F3F4F6",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#172C4A",
                borderRadius: 5,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", display: "block", mt: 2 }}
          >
            Toplam 1,248 ürün çeşidinden 848 adedi fiziki olarak doğrulandı.
          </Typography>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid #FECACA",
            bgcolor: "#FEF2F2",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
          >
            <WarningAmberIcon sx={{ color: "#DC2626", fontSize: 26 }} />
            <Typography
              variant="subtitle1"
              sx={{ color: "#991B1B", fontWeight: 700 }}
            >
              Bulunan Uyuşmazlık
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{ color: "#991B1B", fontWeight: 800, mb: 1 }}
          >
            3 Farklı Raf
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#DC2626", display: "block" }}
          >
            Sistem verisiyle fiziki sayımın uyuşmadığı noktalar.
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}
