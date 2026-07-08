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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
;
interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = ["Elektronik", "Mobilya", "Aksesuar", "Kırtasiye", "Sarf Malzeme"];

export default function AddProductModal({ open, onClose }: AddProductModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form stateleri
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    volume: "",
    criticalLevel: "",
    initialStock: "",
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
    console.log("Kaydedilecek Ürün:", formData);
    // Burada API'ye gönderme işlemi yapılacak
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile} // Mobilde tam ekran, masaüstünde modal
      // ÇÖZÜM BURADA: MUI v7 uyumlu slotProps kullanımı
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 600,
            borderRadius: { xs: 0, sm: 3 },
            p: { xs: 1, sm: 2 },
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ bgcolor: "#F3F4F6", p: 1, borderRadius: 2, color: "#172C4A", display: "flex" }}>
            <ViewInArOutlinedIcon />

          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
            Yeni Ürün Ekle
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderBottom: "none", borderColor: "#E5E7EB" }}>
        <Box component="form" id="addProductForm" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Ürün Adı"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Stok Kodu (SKU)"
                name="sku"
                placeholder="Örn: SKU-1001"
                value={formData.sku}
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
                label="Kategori"
                name="category"
                value={formData.category}
                onChange={handleChange}
                sx={inputStyle}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Birim Hacim"
                name="volume"
                placeholder="Örn: 1200 cm³"
                value={formData.volume}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Kritik Seviye"
                name="criticalLevel"
                value={formData.criticalLevel}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Başlangıç Stoğu"
                name="initialStock"
                value={formData.initialStock}
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
          sx={{ color: "#6B7280", borderColor: "#D1D5DB", "&:hover": { bgcolor: "#F9FAFB", borderColor: "#9CA3AF" }, textTransform: "none", fontWeight: 600, borderRadius: 2 }}
        >
          İptal
        </Button>
        <Button
          type="submit"
          form="addProductForm"
          variant="contained"
          disableElevation
          sx={{ bgcolor: "#172C4A", "&:hover": { bgcolor: "#0F1D33" }, textTransform: "none", fontWeight: 600, borderRadius: 2, px: 4 }}
        >
          Ürünü Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}