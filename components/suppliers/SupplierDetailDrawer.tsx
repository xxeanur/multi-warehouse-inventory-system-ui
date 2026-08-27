"use client";

import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SupplierDto } from "@/types/definitions/supplier";

interface SupplierDetailDrawerProps {
  open: boolean;
  supplier: SupplierDto | null;
  onClose: () => void;
  isSuperAdmin: boolean;
  onEditClick: (supplier: SupplierDto) => void;
  onDeleteClick: (id: string, companyName: string) => void;
}

export default function SupplierDetailDrawer({
  open,
  supplier,
  onClose,
  isSuperAdmin,
  onEditClick,
  onDeleteClick,
}: SupplierDetailDrawerProps) {
  const primaryColor = "#172C4A";

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.3)" } },
        paper: {
          sx: {
            width: { xs: "100%", sm: 420 },
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          },
        },
      }}
    >
      {supplier && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  bgcolor: "#EEF2FF",
                  p: 1.5,
                  borderRadius: 2,
                  color: primaryColor,
                  display: "flex",
                }}
              >
                <BusinessOutlinedIcon />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  {supplier.companyName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  Tedarikçi Detay Kartı
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2, borderColor: "#E5E7EB", flexShrink: 0 }} />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              pr: 0.5,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PersonOutlineOutlinedIcon sx={{ color: "#9CA3AF" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  İlgili Kişi
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  {supplier.contactName || "Belirtilmemiş"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PhoneOutlinedIcon sx={{ color: "#9CA3AF" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  Telefon Numarası
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  {supplier.phone || "Belirtilmemiş"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmailOutlinedIcon sx={{ color: "#9CA3AF" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  E-posta Adresi
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  {supplier.email || "Belirtilmemiş"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ReceiptLongOutlinedIcon sx={{ color: "#9CA3AF" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  Vergi Bilgileri
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  {supplier.taxNumber
                    ? `${supplier.taxNumber} (${supplier.taxOffice || "Vergi Dairesi Yok"})`
                    : "Belirtilmemiş"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <LocationOnOutlinedIcon sx={{ color: "#9CA3AF", mt: 0.3 }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  Firma Adresi
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    whiteSpace: "pre-line",
                  }}
                >
                  {supplier.city
                    ? `${supplier.city} / ${supplier.district}\n${supplier.fullAddress}`
                    : "Adres bilgisi girilmemiş"}
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarTodayOutlinedIcon sx={{ color: "#9CA3AF" }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", display: "block" }}
                >
                  Oluşturulma Tarihi
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#374151" }}
                >
                  {supplier.createdDate
                    ? new Date(supplier.createdDate).toLocaleDateString("tr-TR")
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {isSuperAdmin && (
            <Box
              sx={{
                pt: 2,
                borderTop: "1px solid #E5E7EB",
                display: "flex",
                gap: 2,
                flexShrink: 0,
                bgcolor: "#FFFFFF",
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<EditOutlinedIcon />}
                onClick={() => {
                  onClose();
                  onEditClick(supplier);
                }}
                sx={{
                  borderColor: "#D1D5DB",
                  color: "#374151",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Düzenle
              </Button>
              <Button
                variant="contained"
                color="error"
                fullWidth
                disableElevation
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => onDeleteClick(supplier.id, supplier.companyName)}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Sil
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
}
