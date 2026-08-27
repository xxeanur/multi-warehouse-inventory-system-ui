"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { UserDto } from "@/types/identity/user";

interface ResetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  selectedUser: UserDto | null;
  onConfirm: (newPassword: string) => void;
}

export default function ResetPasswordDialog({
  open,
  onClose,
  selectedUser,
  onConfirm,
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (open) setNewPassword("");
  }, [open]);

  const handleSubmit = () => {
    if (newPassword.trim().length >= 6) {
      onConfirm(newPassword);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { borderRadius: 3, p: 1, maxWidth: 400 } } }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: "#111827", pb: 1 }}>
        Kullanıcı Şifresini Sıfırla
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: "#4B5563", fontSize: "0.875rem", mb: 3 }}
        >
          <Typography
            component="span"
            sx={{ fontWeight: 700, color: "#111827" }}
          >
            {selectedUser
              ? `${selectedUser.firstName} ${selectedUser.lastName}`
              : ""}
          </Typography>{" "}
          adlı kullanıcının şifresini sıfırlamak üzeresiniz. Lütfen yeni bir
          giriş şifresi belirleyin.
        </DialogContentText>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            disabled
            size="small"
            label="Kullanıcı E-Posta"
            value={selectedUser?.email || ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#F3F4F6",
              },
            }}
          />
          <TextField
            fullWidth
            size="small"
            type="password"
            label="Yeni Geçici Şifre"
            placeholder="En az 6 karakter girin..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#F9FAFB",
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{ color: "#6B7280", fontWeight: 600, textTransform: "none" }}
        >
          İptal
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={newPassword.trim().length < 6}
          sx={{
            bgcolor: "#059669",
            "&:hover": { bgcolor: "#047857" },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Şifreyi Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
}
