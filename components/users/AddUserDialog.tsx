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
  MenuItem,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import { userService } from "@/services/identity/userService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { UserRole, UserDto } from "@/types/identity/user";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { notifySuccess } from "@/lib/notificationService";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userToEdit?: UserDto | null;
  currentUser: UserDto | null;
}

const roleOptions = [
  { value: UserRole.SuperAdmin, label: "Süper Admin" },
  { value: UserRole.WarehouseManager, label: "Depo Sorumlusu" },
  { value: UserRole.Staff, label: "Saha Personeli" },
];

const formatPhoneNumber = (val: string) => {
  if (!val) return "";
  let cleaned = val.replace(/\D/g, "");

  if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
  if (cleaned.startsWith("5")) cleaned = "90" + cleaned;
  if (cleaned.length === 0) return "";

  if (cleaned.length <= 2) return `+${cleaned}`;
  if (cleaned.length <= 5) return `+${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
  if (cleaned.length <= 8)
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  if (cleaned.length <= 10)
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;

  return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
};

const toTitleCaseTR = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return (
        word.charAt(0).toLocaleUpperCase("tr-TR") +
        word.slice(1).toLocaleLowerCase("tr-TR")
      );
    })
    .join(" ");
};

export default function AddUserDialog({
  open,
  onClose,
  onSuccess,
  userToEdit,
  currentUser,
}: AddUserDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [fetchingWarehouses, setFetchingWarehouses] = useState(false);

  const isManager = currentUser?.role === UserRole.WarehouseManager;
  const isSuperAdmin = currentUser?.role === UserRole.SuperAdmin;

  const defaultFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: UserRole.Staff,
    warehouseId: "",
    password: "",
  };

  const [formData, setFormData] = useState(defaultFormState);

  const fetchWarehouses = () => {
    setFetchingWarehouses(true);
    warehouseService
      .getAllAsync()
      .then((data) => setWarehouses(data))
      .finally(() => setFetchingWarehouses(false));
  };

  useEffect(() => {
    if (open) {
      fetchWarehouses();
      if (userToEdit) {
        setFormData({
          firstName: toTitleCaseTR(userToEdit.firstName),
          lastName: toTitleCaseTR(userToEdit.lastName),
          email: userToEdit.email,
          phone: formatPhoneNumber(userToEdit.phone || ""),
          role: userToEdit.role,
          warehouseId: userToEdit.warehouseId || "",
          password: "",
        });
      } else {
        setFormData({
          ...defaultFormState,
          role: isManager ? UserRole.Staff : UserRole.Staff,
          warehouseId: isManager ? currentUser?.warehouseId || "" : "",
        });
      }
    }
  }, [open, userToEdit, currentUser]);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "2px" },
      "&.Mui-disabled": { bgcolor: "#F3F4F6", color: "#6B7280" },
    },
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#172C4A" },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      setFormData((prev) => ({ ...prev, [name]: toTitleCaseTR(value) }));
      return;
    }

    if (name === "role") {
      const parsedRole = parseInt(value, 10) as UserRole;
      setFormData((prev) => ({
        ...prev,
        role: parsedRole,
        warehouseId: parsedRole === UserRole.SuperAdmin ? "" : prev.warehouseId,
      }));
      return;
    }

    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.replace(/\s/g, ""),
      role: formData.role,
      warehouseId: formData.warehouseId === "" ? null : formData.warehouseId,
    };

    const isEditMode = !!userToEdit;

    const request = isEditMode
      ? userService.updateAsync({
          id: userToEdit.id,
          avatarUrl: userToEdit.avatarUrl || "",
          ...payload,
        })
      : userService.createAsync({ ...payload, password: formData.password });

    request
      .then(() => {
        notifySuccess(
          isEditMode
            ? "Kullanıcı bilgileri başarıyla güncellendi."
            : "Yeni kullanıcı sisteme başarıyla eklendi.",
        );
        setFormData(defaultFormState);
        onSuccess();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isEditMode = !!userToEdit;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
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
            <PersonAddOutlinedIcon />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              {isEditMode
                ? "Yetki ve Bilgileri Düzenle"
                : "Yeni Kullanıcı Ekle"}
            </Typography>
            {!isEditMode && (
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: { xs: "none", sm: "block" } }}
              >
                Sisteme erişimi olacak yeni bir personel profili oluşturun.
              </Typography>
            )}
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
        <Box component="form" id="addUserForm" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Ad"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Soyad"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="email"
                label="E-Posta Adresi"
                name="email"
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
                placeholder="+90 5XX XXX XX XX"
                value={formData.phone}
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
                disabled={isManager}
                helperText={
                  isManager ? "Sadece Saha Personeli ekleyebilirsiniz." : ""
                }
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Bağlı Olduğu Depo"
                name="warehouseId"
                value={formData.warehouseId}
                onChange={handleChange}
                sx={inputStyle}
                disabled={
                  fetchingWarehouses ||
                  isManager ||
                  formData.role === UserRole.SuperAdmin
                }
                helperText={
                  isManager
                    ? "Personel otomatik olarak deponuza atanır."
                    : formData.role === UserRole.SuperAdmin
                      ? "Süper Adminler tüm depolara erişebilir."
                      : ""
                }
              >
                <MenuItem value="">
                  <em>Depo Atanmadı</em>
                </MenuItem>
                {fetchingWarehouses ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} /> Yükleniyor...
                  </MenuItem>
                ) : (
                  warehouses.map((wh) => (
                    <MenuItem key={wh.id} value={wh.id}>
                      {wh.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>

            {!isEditMode && (
              <>
                <Grid size={{ xs: 12 }}>
                  <Divider
                    sx={{
                      my: 1,
                      borderColor: "#E5E7EB",
                      borderStyle: "dashed",
                    }}
                  />
                </Grid>
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
              </>
            )}
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
          form="addUserForm"
          disabled={loading}
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
          {loading
            ? "Kaydediliyor..."
            : isEditMode
              ? "Değişiklikleri Kaydet"
              : "Kullanıcıyı Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
