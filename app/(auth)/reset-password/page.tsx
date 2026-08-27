"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

import { authService } from "@/services/identity/authService";
import { notifySuccess, notifyError } from "@/lib/notificationService";

export default function ResetPasswordPage() {
  const primaryColor = "#172C4A";
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      notifyError("Geçersiz veya eksik doğrulama bağlantısı.");
      router.push("/login");
    }
  }, [token, router]);

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      notifyError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (newPassword.length < 6) {
      notifyError("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    if (newPassword !== confirmPassword) {
      notifyError("Girdiğiniz şifreler eşleşmiyor.");
      return;
    }

    setIsSubmitting(true);

    authService
      .resetPasswordAsync({ token: token!, newPassword })
      .then(() => {
        notifySuccess(
          "Şifreniz başarıyla sıfırlandı. Yeni şifrenizle giriş yapabilirsiniz.",
        );
        router.push("/login");
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  if (!token) return null;
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
            Yeni Şifre Belirle
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mb: 4 }}>
            Lütfen hesabınız için en az 6 karakterli yeni bir şifre belirleyin.
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="Yeni Şifre"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isSubmitting}
            sx={{
              mb: 2.5,
              "& label.Mui-focused": { color: primaryColor },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#F9FAFB",
                "&.Mui-focused fieldset": { borderColor: primaryColor },
                "&:hover fieldset": { borderColor: primaryColor },
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Yeni Şifre (Tekrar)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
            sx={{
              mb: 4,
              "& label.Mui-focused": { color: primaryColor },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#F9FAFB",
                "&.Mui-focused fieldset": { borderColor: primaryColor },
                "&:hover fieldset": { borderColor: primaryColor },
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
              textTransform: "none",
              "&:hover": { bgcolor: "#0F1D33" },
            }}
          >
            {isSubmitting ? "Sıfırlanıyor..." : "Şifremi Güncelle"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
