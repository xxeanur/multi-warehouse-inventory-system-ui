"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

import { UserDto, UserRole } from "@/types/identity/user";

interface UserDetailDrawerProps {
  open: boolean;
  user: UserDto | null;
  currentUser: UserDto | null;
  onClose: () => void;
  onEdit: (user: UserDto) => void;
  onResetPassword: (user: UserDto) => void;
  onSuspend: (user: UserDto) => void;
}

const getRoleText = (role: UserRole) => {
  switch (role) {
    case UserRole.SuperAdmin:
      return "Süper Admin";
    case UserRole.WarehouseManager:
      return "Depo Sorumlusu";
    case UserRole.Staff:
      return "Saha Personeli";
    default:
      return "Bilinmeyen Rol";
  }
};

const formatPhoneNumber = (val: string) => {
  if (!val) return "Belirtilmemiş";
  let cleaned = val.replace(/\D/g, "");
  if (cleaned.startsWith("90")) cleaned = cleaned.substring(2);
  if (cleaned.length === 10)
    return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
  return val;
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

export default function UserDetailDrawer({
  open,
  user,
  currentUser,
  onClose,
  onEdit,
  onResetPassword,
  onSuspend,
}: UserDetailDrawerProps) {
  if (!user || !currentUser) return null;

  const formattedFirstName = toTitleCaseTR(user.firstName);
  const formattedLastName = toTitleCaseTR(user.lastName);

  const isMe = user.id === currentUser.id;

  let canManage = false;
  if (!isMe) {
    if (currentUser.role === UserRole.SuperAdmin) {
      canManage = true;
    } else if (currentUser.role === UserRole.WarehouseManager) {
      if (
        user.role === UserRole.Staff &&
        user.warehouseId === currentUser.warehouseId
      ) {
        canManage = true;
      }
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          bgcolor: "#FAFAFA",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
          Kullanıcı Profili
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ bgcolor: "#F3F4F6", "&:hover": { bgcolor: "#E5E7EB" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#FFFFFF",
              p: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: isMe ? "#172C4A" : "#E5E7EB",
                color: isMe ? "#FFF" : "#4B5563",
                fontSize: "2rem",
                fontWeight: 700,
                mb: 2,
              }}
            >
              {formattedFirstName[0]}
              {formattedLastName[0]}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#111827",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {formattedFirstName} {formattedLastName}{" "}
              {isMe && (
                <Chip
                  label="Sen"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    bgcolor: "#172C4A",
                    color: "white",
                    fontWeight: 700,
                  }}
                />
              )}
            </Typography>
            <Chip
              label={getRoleText(user.role)}
              size="small"
              sx={{
                mt: 1,
                fontWeight: 700,
                bgcolor:
                  user.role === UserRole.SuperAdmin
                    ? "#EEF2FF"
                    : user.role === UserRole.WarehouseManager
                      ? "#F0FDF4"
                      : "#F3F4F6",
                color:
                  user.role === UserRole.SuperAdmin
                    ? "#4F46E5"
                    : user.role === UserRole.WarehouseManager
                      ? "#059669"
                      : "#4B5563",
              }}
            />
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#9CA3AF",
              mb: 1,
              ml: 1,
              textTransform: "uppercase",
            }}
          >
            Hesap Detayları
          </Typography>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#F3F4F6",
                  color: "#4B5563",
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                }}
              >
                <EmailOutlinedIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  E-Posta Adresi
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1.5, borderStyle: "dashed" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#F3F4F6",
                  color: "#4B5563",
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                }}
              >
                <PhoneOutlinedIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  Telefon Numarası
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {formatPhoneNumber(user.phone || "")}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1.5, borderStyle: "dashed" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#F3F4F6",
                  color: "#4B5563",
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                }}
              >
                <BusinessOutlinedIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  Bağlı Olduğu Depo
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {user.role === UserRole.SuperAdmin
                    ? "Genel Merkez (Tüm Depolar)"
                    : user.warehouseName || "Atanmadı"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#9CA3AF",
              mb: 1,
              ml: 1,
              textTransform: "uppercase",
            }}
          >
            Sistem Bilgileri
          </Typography>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                Kayıt Tarihi
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#374151" }}
              >
                {new Date(user.createdDate).toLocaleDateString("tr-TR")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                Hesap Durumu
              </Typography>
              <Chip
                label={user.isActive ? "Aktif" : "Pasif"}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  bgcolor: user.isActive ? "#D1FAE5" : "#FEE2E2",
                  color: user.isActive ? "#065F46" : "#991B1B",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 3,
            bgcolor: "#FFFFFF",
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {isMe ? (
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", textAlign: "center", display: "block" }}
            >
              Kendi hesabınızın yetkilerini Profilim sayfasından
              yönetebilirsiniz.
            </Typography>
          ) : canManage ? (
            <>
              {user.isActive && (
                <>
                  <Button
                    onClick={() => {
                      onClose();
                      onEdit(user);
                    }}
                    variant="outlined"
                    startIcon={<EditOutlinedIcon />}
                    sx={{
                      color: "#374151",
                      borderColor: "#D1D5DB",
                      "&:hover": { bgcolor: "#F9FAFB" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Bilgileri Düzenle
                  </Button>
                  <Button
                    onClick={() => {
                      onClose();
                      onResetPassword(user);
                    }}
                    variant="outlined"
                    startIcon={<VpnKeyOutlinedIcon />}
                    sx={{
                      color: "#059669",
                      borderColor: "#A7F3D0",
                      bgcolor: "#ECFDF5",
                      "&:hover": { bgcolor: "#D1FAE5", borderColor: "#6EE7B7" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Şifreyi Sıfırla
                  </Button>
                </>
              )}

              <Button
                onClick={() => {
                  onClose();
                  onSuspend(user);
                }}
                variant="contained"
                disableElevation
                startIcon={
                  user.isActive ? (
                    <DeleteOutlineOutlinedIcon />
                  ) : (
                    <RestoreOutlinedIcon />
                  )
                }
                sx={{
                  bgcolor: user.isActive ? "#FEE2E2" : "#D1FAE5",
                  color: user.isActive ? "#DC2626" : "#059669",
                  "&:hover": { bgcolor: user.isActive ? "#FECACA" : "#A7F3D0" },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {user.isActive
                  ? "Hesabı Askıya Al"
                  : "Hesabı Yeniden Aktifleştir"}
              </Button>
            </>
          ) : (
            <Typography
              variant="caption"
              sx={{
                color: "#9CA3AF",
                textAlign: "center",
                display: "block",
                p: 1,
                bgcolor: "#F9FAFB",
                borderRadius: 2,
              }}
            >
              Bu kullanıcı üzerinde düzenleme yetkiniz bulunmamaktadır. (Salt
              Okunur)
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
