"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Typography, Box, CircularProgress, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { userService } from "@/services/identity/userService";
import { authService } from "@/services/identity/authService";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Doğrulama linki geçersiz veya bozuk.");
      return;
    }

    userService
      .confirmEmailAsync(token)
      .then(async () => {
        setStatus("success");
        setTimeout(async () => {
          await authService.logout();
        }, 3000);
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err.message || "Doğrulama işlemi başarısız oldu.");
      });
  }, [token]);

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
          p: { xs: 4, md: 5 },
          borderRadius: 4,
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        {status === "loading" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <CircularProgress size={48} sx={{ color: "#172C4A" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
              Doğrulanıyor...
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              Lütfen bekleyin, e-posta adresiniz onaylanıyor.
            </Typography>
          </Box>
        )}

        {status === "success" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 64, color: "#059669" }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
              E-Posta Onaylandı!
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", mb: 2 }}>
              E-posta adresiniz başarıyla güncellendi. Güvenliğiniz için mevcut
              oturumlarınız kapatıldı. <br />
              <br /> <b>Giriş sayfasına yönlendiriliyorsunuz...</b>
            </Typography>
            <CircularProgress size={24} sx={{ color: "#059669" }} />
          </Box>
        )}

        {status === "error" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 64, color: "#DC2626" }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
              Doğrulama Başarısız
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280", mb: 2 }}>
              {errorMessage}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => router.push("/login")}
              sx={{
                bgcolor: "#172C4A",
                "&:hover": { bgcolor: "#0F1D33" },
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Giriş Sayfasına Dön
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}
