import { Box, Card, Typography, Grid, TextField, Switch } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";

export default function WebhookSettingsCard() {
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", display: "flex", alignItems: "center", gap: 1 }}>
          <WebhookOutlinedIcon sx={{ color: "#D97706" }} /> Webhook (Event Triggers)
        </Typography>
        <Switch defaultChecked color="warning" />
      </Box>
      <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 3 }}>
        Sistemdeki kritik stok hareketleri gerçekleştiğinde, dış sunuculara anlık JSON (HTTP POST) fırlatılacak hedef adres.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Endpoint URL" placeholder="https://api.sirketiniz.com/v1/webhook/wms" defaultValue="https://api.sirketiniz.com/v1/webhook/wms" sx={inputStyle} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151", mb: 1.5 }}>
            Tetiklenecek Olaylar (Events)
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2, border: "1px solid #E5E7EB" }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>stok.giris (Mal Kabul)</Typography>
              <Switch defaultChecked size="small" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, bgcolor: "#F9FAFB", borderRadius: 2, border: "1px solid #E5E7EB" }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>stok.cikis (Sevkiyat)</Typography>
              <Switch defaultChecked size="small" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}