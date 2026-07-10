"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Sayfa yönlendirmesi ve menü kapatma işlemini tek fonksiyonda topladık
  const handleNavigate = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
    <>
      {/* Tıklanabilir Profil Alanı */}
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          p: 0.5,
          borderRadius: 2,
          transition: "background-color 0.2s",
          "&:hover": { bgcolor: "#F9FAFB" },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#172C4A",
            fontSize: "0.875rem",
            fontWeight: 700,
          }}
        >
          EÇ
        </Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#111827", fontWeight: 600, lineHeight: 1.2 }}
          >
            Esra Nur Çomak
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Sistem Yöneticisi
          </Typography>
        </Box>
      </Box>

      {/* Açılır Menü (Dropdown) */}
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 220,
              mt: 1.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.08)",
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: { xs: "block", sm: "none" } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
            Esra Nur Çomak
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Sistem Yöneticisi
          </Typography>
        </Box>
        
        <Divider sx={{ display: { xs: "block", sm: "none" }, mb: 0.5 }} />

        {/* Profil Yönlendirmesi */}
        <MenuItem onClick={() => handleNavigate("/profile")} sx={{ py: 1.5, px: 2, fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <PersonOutlineOutlinedIcon fontSize="small" sx={{ color: "#6B7280" }} />
          </ListItemIcon>
          Profilim
        </MenuItem>
        
        {/* Yeni Eklenen Güvenlik Yönlendirmesi */}
        <MenuItem onClick={() => handleNavigate("/security")} sx={{ py: 1.5, px: 2, fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <SecurityOutlinedIcon fontSize="small" sx={{ color: "#6B7280" }} />
          </ListItemIcon>
          Güvenlik
        </MenuItem>

        <Divider sx={{ my: 0.5, borderColor: "#F3F4F6" }} />

        <MenuItem onClick={handleClose} sx={{ py: 1.5, px: 2, fontSize: "0.875rem", fontWeight: 600, color: "#DC2626" }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <LogoutOutlinedIcon fontSize="small" sx={{ color: "#DC2626" }} />
          </ListItemIcon>
          Çıkış Yap
        </MenuItem>
      </Menu>
    </>
  );
}