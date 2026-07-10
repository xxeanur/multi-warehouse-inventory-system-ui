"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// Component'leri dışarıdan çağırıyoruz (Yolları kendi projene göre kontrol et)
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";

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
              width: "100%",
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

        {/* Sağ Kısım: Tamamen Modüler Hale Gelen Component'ler */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            flexShrink: 0,
          }}
        >
          {/* 1. Bildirim Menüsü */}
          <NotificationMenu />

          {/* 2. Profil Menüsü */}
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}