"use client";

import { useState, useEffect } from "react";
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
import { authService } from "@/services/identity/authService";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Cookies from "js-cookie";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const [userName, setUserName] = useState("Yükleniyor...");
  const [userRole, setUserRole] = useState("");
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    const fetchUserFromToken = () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        );

        const decodedToken = JSON.parse(jsonPayload);

        const nameClaim =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ] ||
          decodedToken["name"] ||
          "Kullanıcı";

        const roleClaim =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] ||
          decodedToken["role"] ||
          "Personel";

        setUserName(nameClaim);
        setUserRole(roleClaim);

        const nameParts = nameClaim.trim().split(" ");
        if (nameParts.length >= 2) {
          setUserInitials(
            `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase(),
          );
        } else {
          setUserInitials(nameClaim.substring(0, 2).toUpperCase());
        }
      } catch (error) {
        console.error("Token çözümlenirken hata oluştu:", error);
        setUserName("Kullanıcı");
      }
    };

    fetchUserFromToken();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleClose();
  };

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <>
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
          maxWidth: { xs: "auto", sm: 220 },
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
          {userInitials}
        </Avatar>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ color: "#111827", fontWeight: 600, lineHeight: 1.2 }}
          >
            {userName}
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: "#6B7280" }}>
            {userRole}
          </Typography>
        </Box>
      </Box>

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
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontWeight: 700, color: "#111827" }}
          >
            {userName}
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: "#6B7280" }}>
            {userRole}
          </Typography>
        </Box>

        <Divider sx={{ display: { xs: "block", sm: "none" }, mb: 0.5 }} />

        <MenuItem
          onClick={() => handleNavigate("/profile")}
          sx={{
            py: 1.5,
            px: 2,
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <PersonOutlineOutlinedIcon
              fontSize="small"
              sx={{ color: "#6B7280" }}
            />
          </ListItemIcon>
          Profilim
        </MenuItem>

        <MenuItem
          onClick={() => handleNavigate("/security")}
          sx={{
            py: 1.5,
            px: 2,
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <SecurityOutlinedIcon fontSize="small" sx={{ color: "#6B7280" }} />
          </ListItemIcon>
          Güvenlik
        </MenuItem>

        <Divider sx={{ my: 0.5, borderColor: "#F3F4F6" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#DC2626",
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <LogoutOutlinedIcon fontSize="small" sx={{ color: "#DC2626" }} />
          </ListItemIcon>
          Çıkış Yap
        </MenuItem>
      </Menu>
    </>
  );
}
