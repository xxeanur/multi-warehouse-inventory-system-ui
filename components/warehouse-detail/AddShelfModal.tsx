"use client";

import { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { shelfService } from "@/services/definitions/shelfService";
import { ShelfDto } from "@/types/definitions/shelf";

interface AddShelfModalProps {
  open: boolean;
  onClose: () => void;
  zoneId: string;
  shelfToEdit?: ShelfDto | null;
  onSuccess: () => void;
}

const shelfStatuses = [
  { value: 0, label: "Kullanıma Hazır" },
  { value: 1, label: "Bakımda / Hasarlı" },
  { value: 2, label: "Rezerve" },
];

export default function AddShelfModal({
  open,
  onClose,
  zoneId,
  shelfToEdit,
  onSuccess,
}: AddShelfModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    shelfNumber: "",
    width: "",
    height: "",
    depth: "",
    maxWeight: "",
    status: 0,
  });

  useEffect(() => {
    if (open) {
      if (shelfToEdit) {
        setFormData({
          shelfNumber: shelfToEdit.shelfNumber,
          width: shelfToEdit.width.toString(),
          height: shelfToEdit.height.toString(),
          depth: shelfToEdit.depth.toString(),
          maxWeight: shelfToEdit.maxWeight.toString(),
          status: shelfToEdit.status,
        });
      } else {
        setFormData({
          shelfNumber: "",
          width: "",
          height: "",
          depth: "",
          maxWeight: "",
          status: 0,
        });
      }
    }
  }, [open, shelfToEdit]);

  const primaryColor = "#172C4A";

  const inputStyle = {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (shelfToEdit) {
      await shelfService.updateAsync({
        id: shelfToEdit.id,
        shelfNumber: formData.shelfNumber,
        width: Number(formData.width) || 0,
        height: Number(formData.height) || 0,
        depth: Number(formData.depth) || 0,
        maxWeight: Number(formData.maxWeight) || 0,
        status: Number(formData.status),
        warehouseZoneId: zoneId,
      });
    } else {
      await shelfService.createAsync({
        shelfNumber: formData.shelfNumber,
        width: Number(formData.width) || 0,
        height: Number(formData.height) || 0,
        depth: Number(formData.depth) || 0,
        maxWeight: Number(formData.maxWeight) || 0,
        status: 0,
        warehouseZoneId: zoneId,
      });
    }

    onSuccess();
    onClose();
  };

  const isEditMode = !!shelfToEdit;

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
              color: "#172C4A",
              display: "flex",
            }}
          >
            <StraightenOutlinedIcon sx={{ fontSize: 25, color: "#6B7280" }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                lineHeight: 1.2,
              }}
            >
              {isEditMode ? "Raf Bilgilerini Güncelle" : "Yeni Raf Tanımla"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", display: { xs: "none", sm: "block" } }}
            >
              {isEditMode
                ? "Rafın fiziksel boyutlarını ve kapasitesini düzenleyin."
                : "Seçilen bloğun içine yeni bir raf lokasyonu ekleyin."}
            </Typography>
          </Box>
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
        sx={{ borderBottom: "none", borderColor: "#E5E7EB", py: 2 }}
      >
        <Box
          component="form"
          id="addShelfForm"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2.5}>
            {/* NUMARA VE DURUM */}
            <Grid size={{ xs: 12, sm: isEditMode ? 6 : 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Raf Numarası / Kodu"
                name="shelfNumber"
                placeholder="Örn: A-01"
                value={formData.shelfNumber}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            {isEditMode && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  required
                  fullWidth
                  size="small"
                  label="Raf Durumu"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  sx={inputStyle}
                >
                  {shelfStatuses.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            {/* FİZİKSEL BİLGİLER */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Genişlik (cm)"
                name="width"
                value={formData.width}
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
                label="Yükseklik (cm)"
                name="height"
                value={formData.height}
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
                label="Derinlik (cm)"
                name="depth"
                value={formData.depth}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Maksimum Ağırlık (kg)"
                name="maxWeight"
                value={formData.maxWeight}
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
          form="addShelfForm"
          variant="contained"
          disableElevation
          disabled={!formData.shelfNumber.trim()}
          sx={{
            bgcolor: "#172C4A",
            "&:hover": { bgcolor: "#0F1D33" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
          }}
        >
          {isEditMode ? "Değişiklikleri Kaydet" : "Rafı Oluştur"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
