"use client";

import {
  Box,
  Card,
  Typography,
  Divider,
  LinearProgress,
  Avatar,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

interface SummaryPanelProps {
  tabValue: number;
  sourceWarehouse: string;
  targetWarehouse: string;
  getWarehouseData: (name: string) => {
    name: string;
    capacity: number;
    color: string;
  };
}

export default function SummaryPanel({
  tabValue,
  sourceWarehouse,
  targetWarehouse,
  getWarehouseData,
}: SummaryPanelProps) {
  // Animasyon kutusu için dinamik değişkenler
  let leftIcon,
    rightIcon,
    leftColor,
    rightColor,
    lineColor,
    leftLabel,
    rightLabel;

  if (tabValue === 0) {
    // 0: Ürün Girişi (Tedarikçi -> Hedef Depo)
    leftIcon = <LocalShippingOutlinedIcon />;
    rightIcon = <LocationOnOutlinedIcon />;
    leftColor = "#9CA3AF"; // Gri (Dış Kaynak)
    rightColor = getWarehouseData(targetWarehouse).color;
    lineColor = "#059669"; // Yeşil akış
    leftLabel = "Dış Tedarikçi";
    rightLabel = getWarehouseData(targetWarehouse).name;
  } else if (tabValue === 1) {
    // 1: Ürün Çıkışı (Kaynak Depo -> Müşteri)
    leftIcon = <LocationOnOutlinedIcon />;
    rightIcon = <LocalShippingOutlinedIcon />;
    leftColor = getWarehouseData(sourceWarehouse).color;
    rightColor = "#9CA3AF"; // Gri (Dış Kaynak)
    lineColor = "#DC2626"; // Kırmızı akış
    leftLabel = getWarehouseData(sourceWarehouse).name;
    rightLabel = "Müşteri / Sevkiyat";
  } else {
    // 2: Transfer (Kaynak Depo -> Hedef Depo)
    leftIcon = <LocationOnOutlinedIcon />;
    rightIcon = <LocationOnOutlinedIcon />;
    leftColor = getWarehouseData(sourceWarehouse).color;
    rightColor = getWarehouseData(targetWarehouse).color;
    lineColor = "#4F46E5"; // İndigo akış
    leftLabel = getWarehouseData(sourceWarehouse).name;
    rightLabel = getWarehouseData(targetWarehouse).name;
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}
        >
          Operasyon Özeti
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          Seçili depoların anlık durumları
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {/* Sadece Çıkış veya Transferde Kaynak Depoyu Göster */}
        {(tabValue === 1 || tabValue === 2) && (
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#6B7280",
                fontWeight: 700,
                mb: 1,
                display: "block",
              }}
            >
              KAYNAK DEPO
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <Avatar
                sx={{
                  bgcolor: getWarehouseData(sourceWarehouse).color + "20",
                  color: getWarehouseData(sourceWarehouse).color,
                  width: 32,
                  height: 32,
                }}
              >
                <LocationOnOutlinedIcon fontSize="small" />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#111827" }}
                >
                  {getWarehouseData(sourceWarehouse).name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 0.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>
                    Doluluk
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: getWarehouseData(sourceWarehouse).color,
                    }}
                  >
                    %{getWarehouseData(sourceWarehouse).capacity}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={getWarehouseData(sourceWarehouse).capacity}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "#F3F4F6",
                "& .MuiLinearProgress-bar": {
                  bgcolor: getWarehouseData(sourceWarehouse).color,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        {/* Sadece Giriş veya Transferde Hedef Depoyu Göster */}
        {(tabValue === 0 || tabValue === 2) && (
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#6B7280",
                fontWeight: 700,
                mb: 1,
                display: "block",
              }}
            >
              HEDEF DEPO
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <Avatar
                sx={{
                  bgcolor: getWarehouseData(targetWarehouse).color + "20",
                  color: getWarehouseData(targetWarehouse).color,
                  width: 32,
                  height: 32,
                }}
              >
                <LocationOnOutlinedIcon fontSize="small" />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#111827" }}
                >
                  {getWarehouseData(targetWarehouse).name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 0.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>
                    Doluluk
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: getWarehouseData(targetWarehouse).color,
                    }}
                  >
                    %{getWarehouseData(targetWarehouse).capacity}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={getWarehouseData(targetWarehouse).capacity}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "#F3F4F6",
                "& .MuiLinearProgress-bar": {
                  bgcolor: getWarehouseData(targetWarehouse).color,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* DİNAMİK OPERASYON HARİTASI / ANİMASYONU */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 180,
          bgcolor: "#F9FAFB",
          borderRadius: 2,
          border: "1px dashed #D1D5DB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundImage: "radial-gradient(#E5E7EB 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
            px: 3,
          }}
        >
          {/* Sol İkon */}
          <Box sx={{ textAlign: "center", zIndex: 2, width: 80 }}>
            <Avatar
              sx={{
                bgcolor: "#FFFFFF",
                color: leftColor,
                border: `2px solid ${leftColor}`,
                width: 40,
                height: 40,
                mx: "auto",
                mb: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              {leftIcon}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#6B7280",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              {leftLabel}
            </Typography>
          </Box>

          {/* Animasyonlu Çizgi */}
          <Box
            sx={{
              flexGrow: 1,
              height: 2,
              bgcolor: lineColor,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: -4,
                left: 0,
                width: 10,
                height: 10,
                bgcolor: lineColor,
                borderRadius: "50%",
                animation: "moveDot 2s infinite linear",
              },
              "@keyframes moveDot": {
                "0%": { left: "0%" },
                "100%": { left: "100%" },
              },
            }}
          />

          {/* Sağ İkon */}
          <Box sx={{ textAlign: "center", zIndex: 2, width: 80 }}>
            <Avatar
              sx={{
                bgcolor: "#FFFFFF",
                color: rightColor,
                border: `2px solid ${rightColor}`,
                width: 40,
                height: 40,
                mx: "auto",
                mb: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              {rightIcon}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#6B7280",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              {rightLabel}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
