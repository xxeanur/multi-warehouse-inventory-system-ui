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
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";

interface AddZoneModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddZoneModal({ open, onClose }: AddZoneModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    zoneName: "",
    category: "",
    shelfCount: "",
    maxVolumePerShelf: "",
    maxWeightPerShelf: "",
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
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kaydedilecek Yeni Blok:", formData);
    onClose();
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
            maxWidth: 550,
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
          <Box>
             <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: { xs: "1.1rem", sm: "1.25rem" }, lineHeight: 1.2 }}>
               Yeni Blok & Raf Tanımla
             </Typography>
             <Typography variant="caption" sx={{ color: "#6B7280", display: { xs: "none", sm: "block" } }}>
               Deponun içine yeni bir lokasyon alanı oluşturun.
             </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderBottom: "none", borderColor: "#E5E7EB", py: 2 }}>
        <Box component="form" id="addZoneForm" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2.5}>
            
            {/* TEMEL BİLGİLER */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Blok Kodu / Adı"
                name="zoneName"
                placeholder="Örn: C Bloğu"
                value={formData.zoneName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Kategori / Özellik"
                name="category"
                placeholder="Örn: Hacimli Ürünler"
                value={formData.category}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            {/* FİZİKSEL KAPASİTE BÖLÜMÜ */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <StraightenOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                  Raf Başı Fiziksel Kapasite
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Raf Sayısı"
                name="shelfCount"
                placeholder="Örn: 4"
                value={formData.shelfCount}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Max Hacim"
                name="maxVolumePerShelf"
                placeholder="Örn: 500"
                value={formData.maxVolumePerShelf}
                onChange={handleChange}
                sx={inputStyle}
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end">cm³</InputAdornment>,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Max Ağırlık"
                name="maxWeightPerShelf"
                placeholder="Örn: 250"
                value={formData.maxWeightPerShelf}
                onChange={handleChange}
                sx={inputStyle}
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  },
                }}
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
          form="addZoneForm"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#172C4A",
            "&:hover": { bgcolor: "#0F1D33" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
          }}
        >
          Blok Oluştur
        </Button>
      </DialogActions>
    </Dialog>
  );
}