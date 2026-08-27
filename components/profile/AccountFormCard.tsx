"use client";

import { useState } from "react";
import { Card, Typography, Grid, TextField, Box, Button } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { SxProps, Theme } from "@mui/material/styles";
import { UserDto, UserRole } from "@/types/identity/user";
import { notifySuccess, notifyError } from "@/lib/notificationService";
import { userService } from "@/services/identity/userService";
import { useConfirm } from "@/contexts/ConfirmContext";

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

interface AccountFormCardProps {
  user: UserDto;
}

export default function AccountFormCard({ user }: AccountFormCardProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(formatPhoneNumber(user.phone));
  const [isSaving, setIsSaving] = useState(false);

  const [newEmail, setNewEmail] = useState(user.email);
  const [isRequestingMail, setIsRequestingMail] = useState(false);

  const isSuperAdmin = user.role === UserRole.SuperAdmin;
  const { confirm } = useConfirm();

  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
  };

  const inputStyle: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A" },
    },
    "& .MuiInputBase-input": { fontSize: "0.9rem" },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#172C4A" },
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // SENIOR DOKUNUŞU: Async yapıldı, Trim eklendi ve Confirm eklendi
  const handleUpdateInfo = async () => {
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    // Küçük bir doğrulama (Validation)
    if (!cleanFirstName || !cleanLastName) {
      notifyError("Ad ve soyad alanları boş bırakılamaz.");
      return;
    }

    const isConfirmed = await confirm({
      title: "Bilgileri Güncelle",
      description:
        "Profil bilgilerinizi güncellemek istediğinize emin misiniz?",
      confirmText: "Evet, Güncelle",
      cancelText: "İptal",
    });

    if (!isConfirmed) return;

    setIsSaving(true);
    const cleanPhoneForDb = phone.replace(/\s/g, "");

    userService
      .updateProfileAsync({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        phone: cleanPhoneForDb,
        avatarUrl: user.avatarUrl || "",
        receiveEmailNotifications: user.receiveEmailNotifications,
        receiveInAppNotifications: user.receiveInAppNotifications,
      })
      .then(() => notifySuccess("Kişisel bilgileriniz başarıyla güncellendi."))
      .catch(() => notifyError("Bilgiler güncellenirken bir hata oluştu."))
      .finally(() => setIsSaving(false));
  };

  const handleEmailChangeRequest = async () => {
    if (newEmail === user.email) return;

    const isConfirmed = await confirm({
      title: "E-Posta Değişikliği",
      description: `E-posta adresinizi '${newEmail}' olarak değiştirmek üzeresiniz. Onaylama maili gönderilecektir. Devam edilsin mi?`,
      confirmText: "Evet, Gönder",
      cancelText: "İptal",
    });

    if (!isConfirmed) return;

    setIsRequestingMail(true);

    userService
      .requestEmailChangeAsync(newEmail)
      .then(() =>
        notifySuccess(
          "Doğrulama maili yeni adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.",
        ),
      )
      .catch(() => notifyError("E-posta talebi başarısız oldu."))
      .finally(() => setIsRequestingMail(false));
  };

  const displayWarehouseName =
    isSuperAdmin &&
    (!user.warehouseName || user.warehouseName === "Depo Atanmamış")
      ? "Genel Merkez"
      : user.warehouseName || "Depo Atanmamış";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Card elevation={0} sx={sectionCardStyle}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: "#111827",
            mb: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <BadgeOutlinedIcon sx={{ color: "#172C4A" }} /> Hesap ve Kimlik
          Bilgileri
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#6B7280", display: "block", mb: 3 }}
        >
          Sistem içi formlarda kullanılacak kimlik detayları.
        </Typography>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Ad"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={inputStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Soyad"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={inputStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Telefon Numarası"
              value={phone}
              onChange={handlePhoneChange}
              sx={inputStyle}
              placeholder="+90 5XX XXX XX XX"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Çalışma Deposu"
              value={displayWarehouseName}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#172C4A" },
                  "&.Mui-focused fieldset": { borderColor: "#172C4A" },
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.9rem",
                  color: "#6B7280",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.9rem",
                  color: "#6B7280",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#172C4A" },
              }}
              helperText="Depo değişikliği sadece yöneticiler tarafından yapılabilir."
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={handleUpdateInfo}
              disabled={isSaving}
              sx={{
                bgcolor: "#172C4A",
                "&:hover": { bgcolor: "#0F1D33" },
                py: 1.2,
                px: 4,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {isSaving ? "Güncelleniyor..." : "Bilgileri Güncelle"}
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card elevation={0} sx={sectionCardStyle}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: "#111827",
            mb: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MailOutlinedIcon sx={{ color: "#172C4A" }} /> E-Posta Yönetimi
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#6B7280", display: "block", mb: 3 }}
        >
          {isSuperAdmin
            ? "Değişiklik, doğrulama linkine tıklandıktan sonra kalıcı olacaktır."
            : "E-posta adresinizi değiştirmek için lütfen sistem yöneticinizle iletişime geçin."}
        </Typography>

        <Grid container spacing={2.5} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              fullWidth
              label={
                isSuperAdmin
                  ? "Yeni E-Posta Adresini Girin"
                  : "Kayıtlı E-Posta Adresi"
              }
              value={isSuperAdmin ? newEmail : user.email}
              onChange={(e) => setNewEmail(e.target.value)}
              slotProps={{
                input: {
                  readOnly: !isSuperAdmin,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: !isSuperAdmin ? "#F3F4F6" : "#F9FAFB",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#172C4A" },
                  "&.Mui-focused fieldset": { borderColor: "#172C4A" },
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.9rem",
                  color: !isSuperAdmin ? "#6B7280" : "#111827",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.9rem",
                  color: !isSuperAdmin ? "#6B7280" : "#111827",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#172C4A" },
              }}
            />
          </Grid>
          {isSuperAdmin && (
            <Grid
              size={{ xs: 12, sm: 4 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              <Button
                variant="outlined"
                onClick={handleEmailChangeRequest}
                disabled={isRequestingMail || newEmail === user.email}
                sx={{
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { borderColor: "#D1D5DB", bgcolor: "#F9FAFB" },
                }}
              >
                {isRequestingMail ? "Gönderiliyor..." : "Doğrulama Gönder"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
}
