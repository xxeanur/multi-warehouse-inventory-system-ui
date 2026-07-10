"use client";

import { Box, Typography, TextField, Button, Link, Card, CardContent } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LayersIcon from "@mui/icons-material/Layers";

export default function ForgotPasswordPage() {
  const primaryColor = "#172C4A";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F3F4F6" }}>
      <Card elevation={0} sx={{ maxWidth: 420, width: "100%", borderRadius: 4, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)" }}>
        <CardContent sx={{ p: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, justifyContent: "center" }}>
            <LayersIcon sx={{ fontSize: 32, color: primaryColor }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: primaryColor }}>Entegre Yazılım</Typography>
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Şifreni mi unuttun?</Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mb: 4 }}>
            E-posta adresini gir, sana şifreni sıfırlaman için bir bağlantı gönderelim.
          </Typography>

          <TextField fullWidth label="E-Posta Adresi" sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#F9FAFB" } }} />
          
          <Button fullWidth variant="contained" sx={{ py: 1.5, bgcolor: primaryColor, fontWeight: 700, borderRadius: 2, mb: 3, textTransform: "none" }}>
            Sıfırlama Bağlantısı Gönder
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Link href="/login" sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: primaryColor, fontWeight: 600, textDecoration: "none" }}>
              <ArrowBackOutlinedIcon fontSize="small" /> Giriş ekranına dön
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}