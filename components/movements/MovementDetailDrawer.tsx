"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/Person2Outlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { stockMovementService } from "@/services/inventory/stockMovementService";
import { StockMovementDetailData } from "@/types/inventory/stockMovement";
import MovementTypeChip from "./MovementTypeChip";

interface MovementDetailDrawerProps {
  open: boolean;
  movementId: string | null;
  onClose: () => void;
}

export default function MovementDetailDrawer({
  open,
  movementId,
  onClose,
}: MovementDetailDrawerProps) {
  const [data, setData] = useState<StockMovementDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && movementId) {
      setLoading(true);
      stockMovementService
        .getDetailByIdAsync(movementId)
        .then((res) => setData(res))
        .catch((err) => console.error("Detay çekilemedi:", err))
        .finally(() => setLoading(false));
    } else {
      setData(null);
    }
  }, [open, movementId]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          bgcolor: "#FAFAFA",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
          İşlem Detayı
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ bgcolor: "#F3F4F6", "&:hover": { bgcolor: "#E5E7EB" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <CircularProgress sx={{ color: "#FF385C" }} />
        </Box>
      ) : data ? (
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              mb: 3,
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <MovementTypeChip direction={data.movementDirection} />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color:
                    data.movementDirection === "ÇIKIŞ"
                      ? "#DC2626"
                      : data.movementDirection === "GİRİŞ"
                        ? "#059669"
                        : "#111827",
                }}
              >
                {data.movementDirection === "GİRİŞ"
                  ? "+"
                  : data.movementDirection === "ÇIKIŞ"
                    ? "-"
                    : ""}
                {data.quantity} Adet
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              {data.productName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              SKU: {data.productCode}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#9CA3AF",
              mb: 1,
              ml: 1,
              textTransform: "uppercase",
            }}
          >
            Konum ve Zaman
          </Typography>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#F3F4F6",
                  color: "#4B5563",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                }}
              >
                <Inventory2OutlinedIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: "0.75rem" }}
                >
                  İşlem Konumu
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {data.warehouseName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4B5563" }}>
                  Raf: {data.shelfCode}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                İşlem Tarihi
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#374151" }}
              >
                {new Date(data.createdDate).toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#9CA3AF",
              mb: 1,
              ml: 1,
              textTransform: "uppercase",
            }}
          >
            Kayıt Bilgileri
          </Typography>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255, 56, 92, 0.1)",
                  color: "#FF385C",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                }}
              >
                <PersonOutlineIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: "0.75rem" }}
                >
                  Operatör / Onaylayan
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {data.operatorName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                  {data.operatorRole} • {data.operatorEmail}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#F3F4F6",
                  color: "#4B5563",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                }}
              >
                <ReceiptLongOutlinedIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: "0.75rem" }}
                >
                  Referans Belge
                </Typography>
                <Box sx={{ fontWeight: 600, color: "#374151", mt: 0.5 }}>
                  <Chip
                    label={data.documentReference}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 1.5,
                      bgcolor: "#F3F4F6",
                      color: "#111827",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {data.description && (
              <>
                <Divider sx={{ my: 1.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: "0.75rem", mb: 0.5 }}
                >
                  Sistem Notu / Açıklama
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#374151", fontStyle: "italic" }}
                >
                  &quot;{data.description}&quot;
                </Typography>
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography>Veri bulunamadı.</Typography>
        </Box>
      )}
    </Drawer>
  );
}
