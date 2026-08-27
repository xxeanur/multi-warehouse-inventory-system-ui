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
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { categoryService } from "@/services/definitions/categoryService";
import { CategoryDto } from "@/types/definitions/category";
import { notifySuccess, notifyError } from "@/lib/notificationService";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingCategory: CategoryDto | null;
}

export default function CategoryDialog({
  open,
  onClose,
  onSuccess,
  editingCategory,
}: CategoryDialogProps) {
  const primaryColor = "#172C4A";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (editingCategory) {
        setFormData({
          name: editingCategory.name,
          description: editingCategory.description,
        });
      } else {
        setFormData({ name: "", description: "" });
      }
    }
  }, [open, editingCategory]);

  const inputStyle: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": { fontSize: "0.9rem" },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
    "& label.Mui-focused": { color: "#172C4A" },
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCategory) {
        await categoryService.updateAsync({
          id: editingCategory.id,
          name: formData.name,
          description: formData.description,
        });
        notifySuccess("Kategori başarıyla güncellendi.");
      } else {
        await categoryService.createAsync({
          name: formData.name,
          description: formData.description,
        });
        notifySuccess("Kategori başarıyla eklendi.");
      }
      onSuccess();
      onClose();
    } catch (error) {
      notifyError("Kaydetme işlemi başarısız oldu.");
      console.error(error);
    } finally {
      setLoading(false);
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
              color: primaryColor,
              display: "flex",
            }}
          >
            <CategoryOutlinedIcon />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#111827",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            {editingCategory ? "Kategori Güncelle" : "Yeni Kategori Ekle"}
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
          id="categoryForm"
          onSubmit={handleSave}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Kategori Adı"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Açıklama"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={loading}
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
          form="categoryForm"
          variant="contained"
          disableElevation
          disabled={!formData.name.trim() || loading}
          sx={{
            bgcolor: primaryColor,
            "&:hover": { bgcolor: "#0F1D33" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
          }}
        >
          {loading
            ? "Kaydediliyor..."
            : editingCategory
              ? "Güncelle"
              : "Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
