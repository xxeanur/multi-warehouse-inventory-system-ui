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
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import { warehouseZoneService } from "@/services/common/warehouseZoneService";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";

interface AddZoneModalProps {
  open: boolean;
  onClose: () => void;
  warehouseId: string;
  zoneToEdit?: WarehouseZoneDto | null;
  onSuccess: () => void;
}

const ZONE_TYPES = [
  { value: 0, label: "Genel Depolama (Standart)" },
  { value: 1, label: "Soğuk Hava Deposu" },
  { value: 2, label: "Kontrollü Ortam (İklim/Nem)" },
  { value: 3, label: "Tehlikeli Madde (Yanıcı vb.)" },
  { value: 4, label: "Karantina / Kalite Kontrol" },
  { value: 5, label: "İade Alanı" },
  { value: 6, label: "Yüksek Değerli Ürünler (Özel Güvenlikli)" },
];

export default function AddZoneModal({
  open,
  onClose,
  warehouseId,
  zoneToEdit,
  onSuccess,
}: AddZoneModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    zoneName: "",
    zoneType: 0,
  });

  useEffect(() => {
    if (open && zoneToEdit) {
      setFormData({
        zoneName: zoneToEdit.zoneName,
        zoneType: zoneToEdit.zoneType,
      });
    } else if (open && !zoneToEdit) {
      setFormData({
        zoneName: "",
        zoneType: 0,
      });
    }
  }, [open, zoneToEdit]);

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

    if (zoneToEdit) {
      await warehouseZoneService.updateAsync({
        id: zoneToEdit.id,
        warehouseId: warehouseId,
        zoneName: formData.zoneName,
        zoneType: Number(formData.zoneType),
      });
    } else {
      await warehouseZoneService.createAsync({
        warehouseId: warehouseId,
        zoneName: formData.zoneName,
        zoneType: Number(formData.zoneType),
      });
    }

    onSuccess();
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
            <ViewInArOutlinedIcon />
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
              {zoneToEdit ? "Blok Bilgilerini Güncelle" : "Yeni Blok Tanımla"}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", display: { xs: "none", sm: "block" } }}
            >
              {zoneToEdit
                ? "Bloğun adını veya tipini düzenleyin."
                : "Deponun içine yeni bir lokasyon alanı oluşturun."}
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
          id="addZoneForm"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2.5}>
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
                select
                required
                fullWidth
                size="small"
                label="Blok Tipi / Özelliği"
                name="zoneType"
                value={formData.zoneType}
                onChange={handleChange}
                sx={inputStyle}
              >
                {ZONE_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
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
          disabled={!formData.zoneName.trim()}
          sx={{
            bgcolor: "#172C4A",
            "&:hover": { bgcolor: "#0F1D33" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
          }}
        >
          {zoneToEdit ? "Güncelle" : "Blok Oluştur"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
