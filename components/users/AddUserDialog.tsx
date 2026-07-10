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
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const roleOptions = [
  { value: "SUPER_ADMIN", label: "Süper Admin" },
  { value: "WAREHOUSE_MANAGER", label: "Depo Sorumlusu" },
  { value: "FIELD_STAFF", label: "Saha Personeli" },
];

export default function AddUserDialog({ open, onClose }: AddUserDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form stateleri eklendi
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "FIELD_STAFF", // Varsayılan bir rol atadık
    password: "",
  });

  // Senin o meşhur kusursuz input stilin
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
    console.log("Kaydedilecek Kullanıcı:", formData);
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
            maxWidth: 600, // Referansındaki gibi geniş ve ferah
            borderRadius: { xs: 0, sm: 3 },
            p: { xs: 1, sm: 2 },
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ bgcolor: "#F3F4F6", p: 1, borderRadius: 2, color: "#172C4A", display: "flex" }}>
            <PersonAddOutlinedIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
              Yeni Kullanıcı Ekle
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280", display: { xs: "none", sm: "block" } }}>
              Sisteme erişimi olacak yeni bir personel profili oluşturun.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderBottom: "none", borderColor: "#E5E7EB", py: 2 }}>
        <Box component="form" id="addUserForm" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Ad Soyad"
                name="fullName"
                placeholder="Örn: Ahmet Yılmaz"
                value={formData.fullName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            
            {/* E-Posta ve Rol Yan Yana */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="email"
                label="E-Posta Adresi"
                name="email"
                placeholder="Örn: ahmet@sirket.com"
                value={formData.email}
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
                label="Sistem Rolü"
                name="role"
                value={formData.role}
                onChange={handleChange}
                sx={inputStyle}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }} />
            </Grid>

            {/* Şifre Alanı */}
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="password"
                label="Geçici Şifre"
                name="password"
                placeholder="Kullanıcı için geçici bir şifre belirleyin"
                value={formData.password}
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
            borderRadius: 2 
          }}
        >
          İptal
        </Button>
        <Button
          type="submit"
          form="addUserForm"
          variant="contained"
          disableElevation
          sx={{ 
            bgcolor: "#172C4A", 
            "&:hover": { bgcolor: "#0F1D33" }, 
            textTransform: "none", 
            fontWeight: 600, 
            borderRadius: 2, 
            px: 4 
          }}
        >
          Kullanıcıyı Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}