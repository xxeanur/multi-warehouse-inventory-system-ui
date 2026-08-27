"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { MappedShelf } from "./WarehouseZoneMap";
import { shelfService } from "@/services/definitions/shelfService";
import { formatVolume, formatWeight } from "@/utils/formatters";

interface ShelfDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  shelf: MappedShelf | null;
  canManage: boolean;
  onEdit: () => void;
  onDeleteSuccess: () => void;
}

export default function ShelfDetailDrawer({
  open,
  onClose,
  shelf,
  canManage,
  onEdit,
  onDeleteSuccess,
}: ShelfDetailDrawerProps) {
  if (!shelf) return null;

  const handleDelete = async () => {
    await shelfService.removeAsync(shelf.id);
    onDeleteSuccess();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1300 }}
      slotProps={{
        paper: { sx: { width: { xs: "100%", sm: 420 }, bgcolor: "#FFFFFF" } },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            p: { xs: 2.5, md: 3 },
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                bgcolor: "#F3F4F6",
                p: 1.5,
                borderRadius: 2,
                color: "#172C4A",
                display: "flex",
              }}
            >
              <Inventory2OutlinedIcon />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.2,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                Raf: {shelf.shelfNumber}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>
                Durum: {shelf.status}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2.5, md: 3 } }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#9CA3AF",
              mb: 2,
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: "0.75rem",
            }}
          >
            KAPASİTE VE DOLULUK
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Güncel / Max Hacim
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {formatVolume(shelf.currentVolumeCm3)} /{" "}
                {formatVolume(shelf.maxVolumeCm3)}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Güncel / Max Ağırlık
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {formatWeight(shelf.currentWeightKg)} /{" "}
                {formatWeight(shelf.maxWeightKg)}
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{ my: 3, borderStyle: "dashed", borderColor: "#E5E7EB" }}
          />

          <Typography
            variant="subtitle2"
            sx={{
              color: "#9CA3AF",
              mb: 2,
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: "0.75rem",
            }}
          >
            FİZİKSEL ÖZELLİKLER
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                gridColumn: "span 2",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Ebatlar (Genişlik x Yükseklik x Derinlik)
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {shelf.width} x {shelf.height} x {shelf.depth} cm
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* YALNIZCA YETKİLİ KULLANICILAR İÇİN BUTONLAR GÖRÜNÜR */}
        {canManage && (
          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              borderTop: "1px solid #E5E7EB",
              bgcolor: "#FAFAFA",
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={handleDelete}
                sx={{
                  color: "#DC2626",
                  borderColor: "#DC2626",
                  "&:hover": { bgcolor: "#FEF2F2", borderColor: "#DC2626" },
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Sil
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<EditOutlinedIcon />}
                disableElevation
                onClick={onEdit}
                sx={{
                  bgcolor: "#172C4A",
                  "&:hover": { bgcolor: "#0F1D33" },
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Düzenle
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
