import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

export default function PasswordResetCard() {
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
      <Box sx={{ flexGrow: 1 }}>
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
          <VpnKeyOutlinedIcon sx={{ color: "#172C4A" }} /> Şifre Yenileme
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#6B7280", display: "block", mb: 3 }}
        >
          Güvenliğiniz için şifrenizi en az 8 karakter uzunluğunda, harf ve
          rakam kombinasyonu ile oluşturun.
        </Typography>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="password"
              label="Mevcut Şifre"
              sx={inputStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="password"
              label="Yeni Şifre"
              sx={inputStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="password"
              label="Yeni Şifre (Tekrar)"
              sx={inputStyle}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3, borderColor: "#F3F4F6", mx: -4 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#172C4A",
            "&:hover": { bgcolor: "#0F1D33" },
            py: 1,
            px: 4,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Şifreyi Güncelle
        </Button>
      </Box>
    </Card>
  );
}
