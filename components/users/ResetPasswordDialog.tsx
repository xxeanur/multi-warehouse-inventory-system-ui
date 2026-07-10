import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Button,
} from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface ResetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

export default function ResetPasswordDialog({
  open,
  onClose,
  selectedUser,
}: ResetPasswordDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { borderRadius: 3, p: 1, maxWidth: 400 } } }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: "#111827", pb: 1 }}>
        Şifreyi Sıfırla
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: "#4B5563", fontSize: "0.875rem", mb: 3 }}
        >
          <Typography
            component="span"
            sx={{ fontWeight: 700, color: "#111827" }}
          >
            {selectedUser?.name}
          </Typography>{" "}
          adlı kullanıcının şifresini sıfırlamak üzeresiniz. Yeni geçici şifre
          oluşturulacak.
        </DialogContentText>
        <TextField
          fullWidth
          disabled
          label="Kullanıcı E-Posta"
          defaultValue={selectedUser?.email}
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#F3F4F6" },
          }}
        />
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
          onClick={onClose}
          sx={{
            bgcolor: "#059669",
            "&:hover": { bgcolor: "#047857" },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Geçici Şifre Oluştur
        </Button>
      </DialogActions>
    </Dialog>
  );
}
