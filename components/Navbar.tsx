"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", minHeight: "64px", gap: 2 }}
      >
        {/* Sol Kısım: Menü Butonu ve Dinamik Arama Çubuğu */}
        <Box
          sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1 }}
        >
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" }, color: "#4B5563" }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#F3F4F6",
              borderRadius: 2,
              px: { xs: 1.5, sm: 2 },
              py: 0.8,
              width: "100%", // Mobilde kalan tüm alanı doldurması için
              maxWidth: { xs: "100%", md: "400px", lg: "600px" },
              border: "1px solid transparent",
              transition: "all 0.2s ease-in-out",
              "&:focus-within": {
                bgcolor: "#FFFFFF",
                border: "1px solid #172C4A",
                boxShadow: "0px 0px 0px 3px rgba(79, 70, 229, 0.1)",
              },
            }}
          >
            <SearchIcon
              sx={{ color: "#9CA3AF", mr: 1, fontSize: { xs: 18, sm: 20 } }}
            />
            <InputBase
              placeholder="Sistemde ara..."
              sx={{
                width: "100%",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                color: "#374151",
              }}
            />
          </Box>
        </Box>

        {/* Sağ Kısım: Bildirim ve Profil (Asla küçülmez: flexShrink: 0) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            flexShrink: 0,
          }}
        >
          <IconButton sx={{ color: "#4B5563" }}>
            <Badge
              badgeContent={3}
              sx={{
                "& .MuiBadge-badge": { bgcolor: "#EF4444", color: "white" },
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#172C4A",
                fontSize: "0.875rem",
              }}
            >
              AD
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#111827", fontWeight: 600, lineHeight: 1.2 }}
              >
                Admin User
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>
                Depo Yöneticisi
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
