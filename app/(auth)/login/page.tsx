"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LayersIcon from "@mui/icons-material/Layers";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const primaryColor = "#172C4A";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#F9FAFB",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#E5E7EB",
      },
      "&:hover fieldset": {
        borderColor: primaryColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
        borderWidth: "1px",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: { xs: "#FFFFFF", sm: "#F3F4F6" }, // Mobilde arka planı da beyaz yapıyoruz
      }}
    >
      <Card
        elevation={0}
        sx={{
          // Mobilde %100 genişlik ve yükseklik, masaüstünde sabit genişlik
          maxWidth: { xs: "100%", sm: 420 },
          width: "100%",
          minHeight: { xs: "100vh", sm: "auto" },
          // Mobilde köşeleri sıfırla, masaüstünde yuvarlat
          borderRadius: { xs: 0, sm: 4 },
          // Mobilde gölgeyi ve kenarlığı kaldır
          boxShadow: { xs: "none", sm: "0px 10px 30px rgba(0, 0, 0, 0.05)" },
          border: { xs: "none", sm: "1px solid rgba(255, 255, 255, 0.8)" },
          bgcolor: "#FFFFFF",
          // Mobilde içeriği dikeyde tam ortalamak için flex yapısı
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          {/* Logo ve Başlık Alanı */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <LayersIcon sx={{ fontSize: 40, color: primaryColor }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "800",
                  color: primaryColor,
                  letterSpacing: "-0.5px",
                }}
              >
                Entegre Yazılım
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#4B5563", fontWeight: "500" }}
            >
              Tekrar Hoş Geldiniz
            </Typography>
          </Box>

          {/* Form Alanı */}
          <form onSubmit={handleLogin}>
            <Typography variant="body2" sx={{ color: "#374151", mb: 1, fontWeight: 500 }}>
              E-posta
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ornek@entegreyazilim.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3, ...inputStyles }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Typography variant="body2" sx={{ color: "#374151", mb: 1, fontWeight: 500 }}>
              Şifre
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1, ...inputStyles }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" sx={{ color: "#9CA3AF" }} />
                        ) : (
                          <Visibility fontSize="small" sx={{ color: "#9CA3AF" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Beni Hatırla ve Şifremi Unuttum */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": {
                        color: primaryColor,
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "#4B5563" }}>
                    Beni hatırla
                  </Typography>
                }
              />
            </Box>

            {/* Giriş Butonu */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                bgcolor: primaryColor,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#0F1D33",
                },
              }}
            >
              Giriş Yap
            </Button>
            
            {/* Alt Linkler */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                mt: 3,
              }}
            >
              <Link
                href="/forgot-password"
                underline="hover"
                sx={{
                  color: primaryColor,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Şifremi Unuttum?
              </Link>
              <Link
               href="/support"
                underline="hover"
                sx={{
                  color: "#6B7280",
                  fontSize: "0.875rem",
                }}
              >
                Yardım Masası
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}