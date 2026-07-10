"use client";

import { Box, Typography, Button, Card, CardContent, Divider } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Link from "next/link";

export default function SupportPage() {
  const primaryColor = "#172C4A";

  // Butonları daha büyük ve Login sayfasındaki "Giriş Yap" butonu ile aynı ağırlıkta tasarladım
  const actionButtonStyle = {
    py: 2, 
    borderRadius: 2, 
    fontWeight: 600, 
    textTransform: "none", 
    fontSize: "1rem",
    justifyContent: "flex-start", 
    px: 3,
    transition: "all 0.2s"
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F3F4F6", p: 2 }}>
      <Card elevation={0} sx={{ maxWidth: 420, width: "100%", borderRadius: 4, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)" }}>
        <CardContent sx={{ p: 5 }}>
          {/* Logo ve Başlık - Kimlik tutarlılığı korundu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, justifyContent: "center" }}>
            <LayersIcon sx={{ fontSize: 32, color: primaryColor }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: primaryColor }}>Entegre Yazılım</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, textAlign: "center" }}>Yardım Merkezi</Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mb: 4, textAlign: "center" }}>
            Operasyonel sorunların için destek ekibimize ulaşın.
          </Typography>

          {/* Büyük ve Şık Aksiyon Butonları */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              startIcon={<SupportAgentOutlinedIcon />} 
              sx={{ 
                ...actionButtonStyle, 
                bgcolor: primaryColor, 
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#0F1D33" }
              }}
            >
              Canlı Destek Başlat
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<EmailOutlinedIcon />} 
              sx={{ 
                ...actionButtonStyle, 
                borderColor: "#E5E7EB", 
                color: primaryColor,
                "&:hover": { borderColor: primaryColor, bgcolor: "#F9FAFB" }
              }}
            >
              Destek Talebi Oluştur
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ textAlign: "center" }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: primaryColor, fontWeight: 600, fontSize: "0.875rem", "&:hover": { textDecoration: "underline" } }}>
                <ArrowBackOutlinedIcon fontSize="small" /> Giriş ekranına dön
              </Typography>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}