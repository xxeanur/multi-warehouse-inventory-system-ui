"use client";

import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
import GlobalSearch from "./GlobalSearch";

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
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px",
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" }, color: "#4B5563" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flex: 2, justifyContent: "center" }}>
          <GlobalSearch />
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
          }}
        >
          <NotificationMenu />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
