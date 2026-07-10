import { Card, Typography, Grid, TextField, Button } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

export default function SmtpSettingsCard() {
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
    <Card
      elevation={0}
      sx={{
        borderRadius: 3, border: "1px solid #E5E7EB", p: { xs: 2.5, md: 4 },
        bgcolor: "#FFFFFF", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <MailOutlineOutlinedIcon sx={{ color: "#059669" }} /> SMTP E-Posta Sunucusu
      </Typography>
      <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 3 }}>
        Sistem bildirimleri, şifre sıfırlama mailleri ve kritik stok uyarıları için kullanılacak kurumsal e-posta çıkış sunucusu.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextField fullWidth label="SMTP Host" defaultValue="smtp.office365.com" sx={inputStyle} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField fullWidth label="Port" defaultValue="587" sx={inputStyle} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Kullanıcı Adı" defaultValue="noreply@system.com" sx={inputStyle} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth type="password" label="Şifre" defaultValue="******" sx={inputStyle} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button variant="outlined" sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, borderColor: "#E5E7EB", color: "#374151" }}>
            Test E-Postası Gönder
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}