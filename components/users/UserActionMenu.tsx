import { Box, Typography, Menu, MenuItem, ListItemIcon } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface UserActionMenuProps {
  anchorEl: HTMLElement | null;
  selectedUser: User | null;
  onClose: () => void;
  onResetPasswordOpen: () => void;
}

export default function UserActionMenu({
  anchorEl,
  selectedUser,
  onClose,
  onResetPasswordOpen,
}: UserActionMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      disableScrollLock
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: 220,
            mt: 0.5,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          },
        },
      }}
    >
      {selectedUser?.role !== "SUPER_ADMIN" ? (
        <Box>
          <MenuItem
            onClick={onClose}
            sx={{
              py: 1.5,
              px: 2,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <EditOutlinedIcon fontSize="small" sx={{ color: "#6B7280" }} />
            </ListItemIcon>
            Rolü ve Yetkiyi Düzenle
          </MenuItem>
          <MenuItem
            onClick={onResetPasswordOpen}
            sx={{
              py: 1.5,
              px: 2,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <VpnKeyOutlinedIcon fontSize="small" sx={{ color: "#059669" }} />
            </ListItemIcon>
            Şifreyi Sıfırla
          </MenuItem>
          <Box sx={{ my: 1, borderBottom: "1px solid #F3F4F6" }} />
          <MenuItem
            onClick={onClose}
            sx={{
              py: 1.5,
              px: 2,
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#DC2626",
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <DeleteOutlineOutlinedIcon
                fontSize="small"
                sx={{ color: "#DC2626" }}
              />
            </ListItemIcon>
            Hesabı Askıya Al
          </MenuItem>
        </Box>
      ) : (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", display: "block" }}
          >
            Kendi hesabınızın yetkilerini Profilim sayfasından yönetebilirsiniz.
          </Typography>
        </Box>
      )}
    </Menu>
  );
}
