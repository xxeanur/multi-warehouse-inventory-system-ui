"use client";

import { useRouter } from "next/navigation"; // YÖNLENDİRME İÇİN EKLENDİ
import { Box, Card, CardContent, Typography, Grid, Avatar, CardActionArea } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

interface DashboardKPIsProps {
  totalProducts: number;
  criticalStockCount: number;
  dailyMovementsCount: number;
  movementIncreasePercentage: number;
}

export default function DashboardKPIs({ 
  totalProducts, 
  criticalStockCount, 
  dailyMovementsCount, 
  movementIncreasePercentage 
}: DashboardKPIsProps) {
  
  const router = useRouter(); // NEXT.JS ROUTER

  const cardStyle = {
    borderRadius: 4,
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F3F4F6",
    height: "100%",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.08)",
    }
  };

  const isIncreasePositive = movementIncreasePercentage >= 0;

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      
      {/* 1. KART: KAYITLI ÜRÜN ÇEŞİDİ -> /products sayfasına gider */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={0} sx={cardStyle}>
          <CardActionArea onClick={() => router.push("/products")} sx={{ height: "100%", p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap sx={{ color: "#6B7280", mb: 1, fontWeight: 600 }}>
                  KAYITLI ÜRÜN ÇEŞİDİ
                </Typography>
                <Typography variant="h4" sx={{ color: "#111827", fontWeight: 800 }}>
                  {totalProducts.toLocaleString('tr-TR')}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "#EEF2FF", color: "#4F46E5", width: 48, height: 48, borderRadius: 3 }}>
                <Inventory2OutlinedIcon />
              </Avatar>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>

      {/* 2. KART: KRİTİK STOK UYARISI -> /products?status=Kritik sayfasına gider */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card 
          elevation={0} 
          sx={{ 
            ...cardStyle, 
            borderColor: criticalStockCount > 0 ? "#FF385C" : "#F3F4F6", 
            bgcolor: criticalStockCount > 0 ? "#FFF1F2" : "#FFFFFF" 
          }}
        >
          <CardActionArea onClick={() => router.push("/products?status=Kritik")} sx={{ height: "100%", p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography 
                  variant="subtitle2" 
                  noWrap 
                  sx={{ color: criticalStockCount > 0 ? "#FF385C" : "#6B7280", mb: 1, fontWeight: 600 }}
                >
                  KRİTİK STOK UYARISI
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ color: criticalStockCount > 0 ? "#FF385C" : "#111827", fontWeight: 800 }}
                >
                  {criticalStockCount}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ color: criticalStockCount > 0 ? "#FF385C" : "#6B7280", mt: 1, display: "block", lineHeight: 1.2, opacity: 0.9 }}
                >
                  Minimum seviyenin altına düşen ürünler
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: criticalStockCount > 0 ? "rgba(255, 56, 92, 0.15)" : "#F3F4F6", color: criticalStockCount > 0 ? "#FF385C" : "#9CA3AF", width: 48, height: 48, borderRadius: 3 }}>
                <WarningAmberIcon />
              </Avatar>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>

      {/* 3. KART: GÜNLÜK İŞLEM HACMİ -> /movements sayfasına gider */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={0} sx={cardStyle}>
          <CardActionArea onClick={() => router.push("/movements")} sx={{ height: "100%", p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap sx={{ color: "#6B7280", mb: 1, fontWeight: 600 }}>
                  GÜNLÜK İŞLEM HACMİ
                </Typography>
                <Typography variant="h4" sx={{ color: "#111827", fontWeight: 800 }}>
                  {dailyMovementsCount}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ color: isIncreasePositive ? "#059669" : "#FF385C", mt: 1, display: "block", fontWeight: 500 }}
                >
                  {isIncreasePositive ? "+" : ""}{movementIncreasePercentage}% düne göre {isIncreasePositive ? "artış" : "düşüş"}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "#F0FDF4", color: "#059669", width: 48, height: 48, borderRadius: 3 }}>
                <LocalShippingOutlinedIcon />
              </Avatar>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>

    </Grid>
  );
}