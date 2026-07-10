import { Box, Card, Typography, Grid, TextField, Button } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { SxProps, Theme } from "@mui/material/styles";

export default function AccountFormCard() {
  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
  };

  const inputStyle: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": { fontSize: "0.9rem" },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
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
        <BadgeOutlinedIcon sx={{ color: "#172C4A" }} /> Hesap ve Kimlik
        Bilgileri
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#6B7280", display: "block", mb: 3 }}
      >
        Sistem içi formlarda otomatik olarak doldurulacak kimlik detayları.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Ad Soyad"
            defaultValue="Esra Nur Çomak"
            sx={inputStyle}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="E-Posta Adresi"
            defaultValue="admin@system.com"
            sx={inputStyle}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Telefon Numarası"
            defaultValue="+90 555 123 4567"
            sx={inputStyle}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Varsayılan Çalışma Deposu"
            select
            slotProps={{ select: { native: true } }}
            sx={inputStyle}
          >
            <option>Konya Merkez Depo</option>
            <option>Ankara Transfer Merkezi</option>
            <option>İstanbul Avrupa Hub</option>
          </TextField>
        </Grid>
        <Grid
          size={{ xs: 12 }}
          sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
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
            Bilgileri Güncelle
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
