"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";

interface AddWarehouseModalProps {
  open: boolean;
  onClose: () => void;
}

const statusOptions = ["Aktif", "Pasif", "Bakımda"];
const cityOptions = ["İstanbul", "Ankara", "İzmir", "Konya", "Bursa", "Antalya"];

export default function AddWarehouseModal({ open, onClose }: AddWarehouseModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form stateleri - Adres alanları eklendi
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    district: "",
    fullAddress: "",
    capacity: "",
    manager: "",
    status: "Aktif",
  });

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "2px" },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kaydedilecek Depo:", formData);
    // API'ye gönderme işlemi burada yapılacak
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile} // Mobilde tam ekran
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 600, // Biraz daha veri alacağı için 600px ideal genişlik
            borderRadius: { xs: 0, sm: 3 },
            p: { xs: 1, sm: 2 },
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ bgcolor: "#F3F4F6", p: 1, borderRadius: 2, color: "#172C4A", display: "flex" }}>
            <WarehouseOutlinedIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
            Yeni Depo Tanımla
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderBottom: "none", borderColor: "#E5E7EB", py: 2 }}>
        <Box component="form" id="addWarehouseForm" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Depo Adı"
                name="name"
                placeholder="Örn: Konya Merkez Depo"
                value={formData.name}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            
            {/* Şehir ve İlçe Yan Yana */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                required
                fullWidth
                size="small"
                label="Şehir (İl)"
                name="city"
                value={formData.city}
                onChange={handleChange}
                sx={inputStyle}
              >
                {cityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="İlçe / Semt"
                name="district"
                placeholder="Örn: Selçuklu"
                value={formData.district}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            {/* Geniş Adres Alanı */}
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                multiline
                rows={3} // Çok satırlı yapı
                size="small"
                label="Açık Adres (Cadde, Sokak, No, Bina)"
                name="fullAddress"
                placeholder="Örn: Akademi Mah. Yeni İstanbul Cad. No:123 Zemin Kat"
                value={formData.fullAddress}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <Divider sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }} />
            </Grid>

            {/* Yönetici ve Kapasite Bilgileri */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Depo Sorumlusu"
                name="manager"
                placeholder="Örn: Ahmet Yılmaz"
                value={formData.manager}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Toplam Kapasite (Palet/Adet)"
                name="capacity"
                placeholder="Örn: 5000"
                value={formData.capacity}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                required
                fullWidth
                size="small"
                label="Durum"
                name="status"
                value={formData.status}
                onChange={handleChange}
                sx={inputStyle}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ color: "#6B7280", borderColor: "#D1D5DB", "&:hover": { bgcolor: "#F9FAFB", borderColor: "#9CA3AF" }, textTransform: "none", fontWeight: 600, borderRadius: 2 }}
        >
          İptal
        </Button>
        <Button
          type="submit"
          form="addWarehouseForm"
          variant="contained"
          disableElevation
          sx={{ bgcolor: "#172C4A", "&:hover": { bgcolor: "#0F1D33" }, textTransform: "none", fontWeight: 600, borderRadius: 2, px: 4 }}
        >
          Depoyu Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}