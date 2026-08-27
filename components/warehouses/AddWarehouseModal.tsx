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
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import { warehouseService } from "@/services/definitions/warehouseService";
import { userService } from "@/services/identity/userService";
import AddressSelector from "@/components/common/AddressSelector";
import {
  WarehouseDto,
  WarehouseOperationalStatus,
} from "@/types/definitions/warehouse";
import { UserDto, UserRole } from "@/types/identity/user";
import { geocodingService } from "@/services/common/geocodingService";
import { notifySuccess } from "@/lib/notificationService";

interface AddWarehouseModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  warehouseToEdit?: WarehouseDto | null;
}

const statusOptions = [
  { label: "Aktif", value: WarehouseOperationalStatus.Active },
  { label: "Pasif", value: WarehouseOperationalStatus.Passive },
  { label: "Bakımda", value: WarehouseOperationalStatus.UnderMaintenance },
];

export default function AddWarehouseModal({
  open,
  onClose,
  onSuccess,
  warehouseToEdit,
}: AddWarehouseModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState<UserDto[]>([]);
  const [fetchingManagers, setFetchingManagers] = useState(false);

  const defaultFormState = {
    name: "",
    city: "",
    district: "",
    fullAddress: "",
    phone: "",
    capacity: "",
    managerId: "",
    operationalStatus: WarehouseOperationalStatus.Active,
  };

  const [formData, setFormData] = useState(defaultFormState);

  const fetchManagers = () => {
    setFetchingManagers(true);
    userService
      .getAllAsync()
      .then((allUsers) => {
        const filteredManagers = allUsers.filter((u) => {
          const isManager = u.role === UserRole.WarehouseManager;
          const isUnassigned = !u.warehouseId || u.warehouseId === "";
          const isAssignedToThisWarehouse =
            warehouseToEdit && u.warehouseId === warehouseToEdit.id;
          return isManager && (isUnassigned || isAssignedToThisWarehouse);
        });

        if (
          warehouseToEdit?.managerId &&
          !filteredManagers.some((m) => m.id === warehouseToEdit.managerId)
        ) {
          const currentManager = allUsers.find(
            (u) => u.id === warehouseToEdit.managerId,
          );
          if (currentManager) filteredManagers.push(currentManager);
        }
        setManagers(filteredManagers);
      })
      .finally(() => setFetchingManagers(false));
  };

  useEffect(() => {
    if (open) {
      if (warehouseToEdit) {
        setFormData({
          name: warehouseToEdit.name || "",
          city: warehouseToEdit.city || "",
          district: warehouseToEdit.district || "",
          fullAddress: warehouseToEdit.fullAddress || "",
          phone: warehouseToEdit.phone || "",
          capacity: warehouseToEdit.maxCapacity
            ? (warehouseToEdit.maxCapacity / 1000000).toString()
            : "",
          managerId: warehouseToEdit.managerId || "",
          operationalStatus: warehouseToEdit.operationalStatus,
        });
      } else {
        setFormData(defaultFormState);
      }
      fetchManagers();
    }
  }, [open, warehouseToEdit]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selectedManagerId =
      formData.managerId === "" ? null : formData.managerId;
    const capacityInCm3 = (Number(formData.capacity) || 0) * 1000000;

    const payload = {
      name: formData.name,
      country: "Türkiye",
      city: formData.city,
      district: formData.district,
      fullAddress: formData.fullAddress,
      phone: formData.phone,
      maxCapacity: capacityInCm3,
      managerId: selectedManagerId,
      operationalStatus: formData.operationalStatus,
    };

    const executeSave = (lat: number | null, lng: number | null) => {
      if (warehouseToEdit) {
        warehouseService
          .updateAsync({
            id: warehouseToEdit.id,
            ...payload,
            latitude: lat ?? warehouseToEdit.latitude,
            longitude: lng ?? warehouseToEdit.longitude,
          })
          .then(() => {
            notifySuccess("Depo güncellendi.");
            if (onSuccess) onSuccess();
            onClose();
          })
          .finally(() => setLoading(false));
      } else {
        warehouseService
          .createAsync({ ...payload, latitude: lat, longitude: lng })
          .then(() => {
            notifySuccess("Yeni depo tanımlandı.");
            if (onSuccess) onSuccess();
            onClose();
          })
          .finally(() => setLoading(false));
      }
    };

    geocodingService
      .getCoordinates(formData.city, formData.district, formData.fullAddress)
      .then((coords) => {
        executeSave(coords.latitude, coords.longitude);
      })
      .catch(() => {
        executeSave(null, null);
      });
  };

  const isManagerIdValid =
    formData.managerId === "" ||
    managers.some((m) => m.id === formData.managerId);

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
            <WarehouseOutlinedIcon />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#111827",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            {warehouseToEdit
              ? "Depo Bilgilerini Güncelle"
              : "Yeni Depo Tanımla"}
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
        sx={{ borderBottom: "none", borderColor: "#E5E7EB", py: 2 }}
      >
        <Box component="form" id="addWarehouseForm" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Depo Adı"
                name="name"
                value={formData.name}
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
                required
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Açık Adres"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider
                sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                label="Depo Telefonu"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Depo Sorumlusu"
                name="managerId"
                value={isManagerIdValid ? formData.managerId : ""}
                onChange={handleChange}
                sx={inputStyle}
                disabled={fetchingManagers}
              >
                <MenuItem value="">
                  <em>Sorumlu Atanmadı</em>
                </MenuItem>
                {fetchingManagers ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} /> Yükleniyor...
                  </MenuItem>
                ) : (
                  managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.id}>
                      {manager.firstName} {manager.lastName}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                size="small"
                type="number"
                label="Toplam Kapasite (m³)"
                name="capacity"
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
                label="Operasyonel Durum"
                name="operationalStatus"
                value={formData.operationalStatus}
                onChange={handleChange}
                sx={inputStyle}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
          disabled={loading}
          variant="outlined"
          sx={{
            color: "#6B7280",
            borderColor: "#D1D5DB",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          İptal
        </Button>
        <Button
          type="submit"
          form="addWarehouseForm"
          disabled={
            loading ||
            !formData.name.trim() ||
            !formData.capacity ||
            !formData.city ||
            !formData.district
          }
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
            : warehouseToEdit
              ? "Değişiklikleri Kaydet"
              : "Depoyu Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
