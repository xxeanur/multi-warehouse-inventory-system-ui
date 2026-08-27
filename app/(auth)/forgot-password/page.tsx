"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LayersIcon from "@mui/icons-material/Layers";

import { authService } from "@/services/identity/authService";
import { notifySuccess, notifyError } from "@/lib/notificationService";

import { useConfirm } from "@/contexts/ConfirmContext";

export default function ForgotPasswordPage() {
  const primaryColor = "#172C4A";
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { confirm } = useConfirm();

  const handleSubmit = async () => {
    if (!email) {
      notifyError("Lütfen e-posta adresinizi giriniz.");
      return;
    }

    const isConfirmed = await confirm({
      title: "Şifre Sıfırlama",
      description: `${email} adresine şifre sıfırlama bağlantısı gönderilecektir. Onaylıyor musunuz?`,
      confirmText: "Evet, Gönder",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    setIsSubmitting(true);

    authService
      .forgotPasswordAsync({ email })
      .then(() => {
        notifySuccess(
          "Eğer bu e-posta sistemimize kayıtlıysa, şifre sıfırlama bağlantısı gönderilmiştir. Lütfen gelen kutunuzu kontrol edin.",
        );
        setEmail("");
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F3F4F6",
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <CardContent sx={{ p: { xs: 4, md: 5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 4,
              justifyContent: "center",
            }}
          >
            <LayersIcon sx={{ fontSize: 32, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: primaryColor }}
            >
              Entegre Yazılım
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            Şifreni mi unuttun?
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mb: 4 }}>
            E-posta adresini gir, sana şifreni sıfırlaman için bir bağlantı
            gönderelim.
          </Typography>

          <TextField
            fullWidth
            label="E-Posta Adresi"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            sx={{
              mb: 3,
              "& label.Mui-focused": {
                color: primaryColor,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#F9FAFB",
                "&.Mui-focused fieldset": {
                  borderColor: primaryColor,
                },
                "&:hover fieldset": {
                  borderColor: primaryColor,
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              py: 1.5,
              bgcolor: primaryColor,
              fontWeight: 700,
              borderRadius: 2,
              mb: 3,
              textTransform: "none",
              "&:hover": { bgcolor: "#0F1D33" },
            }}
          >
            {isSubmitting ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Link
              href="/login"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: primaryColor,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ArrowBackOutlinedIcon fontSize="small" /> Giriş ekranına dön
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
