"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DRAWER_WIDTH = 260;

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F9FAFB" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: {
            sm: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Navbar onMenuClick={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            minWidth: 0,
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
