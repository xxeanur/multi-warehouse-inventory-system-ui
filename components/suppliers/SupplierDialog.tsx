"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { supplierService } from "@/services/definitions/supplierService";
import { SupplierDto } from "@/types/definitions/supplier";
import { geocodingService } from "@/services/common/geocodingService";
import AddressSelector from "@/components/common/AddressSelector";
import { notifySuccess, notifyError } from "@/lib/notificationService";

interface SupplierDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingSupplier: SupplierDto | null;
}

// YARDIMCI FONKSİYON: Telefon numarasını +90 formatına dönüştürür.
const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "";
  // Sadece rakamları tut
  let cleaned = phone.replace(/\D/g, "");

  // Eğer başında 90 yoksa ekle, eğer 0 varsa atıp 90 ekle
  if (cleaned.startsWith("0")) {
    cleaned = "90" + cleaned.substring(1);
  } else if (!cleaned.startsWith("90")) {
    cleaned = "90" + cleaned;
  }

  return "+" + cleaned;
};

const toTitleCase = (str: string): string => {
  if (!str) return "";
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
};

export default function SupplierDialog({
  open,
  onClose,
  onSuccess,
  editingSupplier,
}: SupplierDialogProps) {
  const primaryColor = "#172C4A";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [saveLoading, setSaveLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    fullAddress: "",
    taxNumber: "",
    taxOffice: "",
  });

  const inputStyle: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: primaryColor },
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
        borderWidth: "2px",
      },
    },
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
  };

  useEffect(() => {
    if (open) {
      if (editingSupplier) {
        setFormData({
          companyName: toTitleCase(editingSupplier.companyName),
          contactName: toTitleCase(editingSupplier.contactName),
          email: editingSupplier.email,
          phone: editingSupplier.phone,
          city: editingSupplier.city || "",
          district: editingSupplier.district || "",
          fullAddress: editingSupplier.fullAddress || "",
          taxNumber: editingSupplier.taxNumber,
          taxOffice: toTitleCase(editingSupplier.taxOffice),
        });
      } else {
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          city: "",
          district: "",
          fullAddress: "",
          taxNumber: "",
          taxOffice: "",
        });
      }
    }
  }, [open, editingSupplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Ekranda yazarken anlık olarak baş harfleri büyük göster
    if (
      name === "companyName" ||
      name === "contactName" ||
      name === "taxOffice"
    ) {
      setFormData({ ...formData, [name]: toTitleCase(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      const cleanData = {
        companyName: formData.companyName.trim().toLowerCase(),
        contactName: formData.contactName.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(), //
        phone: formatPhoneNumber(formData.phone), //
        taxOffice: formData.taxOffice.trim().toLowerCase(),
        taxNumber: formData.taxNumber.trim(),
        fullAddress: formData.fullAddress.trim(),
        city: formData.city,
        district: formData.district,
      };

      const { latitude, longitude } = await geocodingService.getCoordinates(
        cleanData.city,
        cleanData.district,
        cleanData.fullAddress,
      );

      if (editingSupplier) {
        await supplierService.updateAsync({
          id: editingSupplier.id,
          country: "Türkiye",
          latitude: latitude ?? editingSupplier.latitude,
          longitude: longitude ?? editingSupplier.longitude,
          ...cleanData,
        });
        notifySuccess("Tedarikçi başarıyla güncellendi.");
      } else {
        await supplierService.createAsync({
          country: "Türkiye",
          latitude,
          longitude,
          ...cleanData,
        });
        notifySuccess("Tedarikçi başarıyla eklendi.");
      }

      onSuccess();
      onClose();
    } catch (error) {
      notifyError("Kaydetme işlemi başarısız oldu.");
      console.error(error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 650,
            borderRadius: { xs: 0, sm: 3 },
            p: { xs: 1, sm: 2 },
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: "#F3F4F6",
              p: 1,
              borderRadius: 2,
              color: primaryColor,
              display: "flex",
            }}
          >
            <LocalShippingOutlinedIcon />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#111827",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            {editingSupplier ? "Tedarikçi Güncelle" : "Yeni Tedarikçi Ekle"}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ borderBottom: "none", borderColor: "#E5E7EB" }}
      >
        <Box
          component="form"
          id="supplierForm"
          onSubmit={handleSave}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Firma Adı"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="İlgili Kişi"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <AddressSelector
              city={formData.city}
              district={formData.district}
              onCityChange={(newCity) =>
                setFormData({ ...formData, city: newCity, district: "" })
              }
              onDistrictChange={(newDistrict) =>
                setFormData({ ...formData, district: newDistrict })
              }
              inputStyle={inputStyle}
            />

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Açık Adres"
                name="fullAddress"
                multiline
                rows={2}
                value={formData.fullAddress}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="E-posta Adresi"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Telefon Numarası"
                name="phone"
                placeholder="Örn: 0555 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Vergi Numarası"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Vergi Dairesi"
                name="taxOffice"
                value={formData.taxOffice}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#6B7280",
            borderColor: "#D1D5DB",
            "&:hover": { bgcolor: "#F9FAFB", borderColor: "#9CA3AF" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          İptal
        </Button>
        <Button
          type="submit"
          form="supplierForm"
          variant="contained"
          disableElevation
          disabled={
            !formData.companyName.trim() ||
            saveLoading ||
            !formData.city ||
            !formData.district
          }
          sx={{
            bgcolor: primaryColor,
            "&:hover": { bgcolor: "#0F1D33" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
          }}
        >
          {saveLoading
            ? "Kaydediliyor..."
            : editingSupplier
              ? "Güncelle"
              : "Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
