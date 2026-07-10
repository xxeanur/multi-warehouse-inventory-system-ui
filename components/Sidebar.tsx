"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LayersIcon from "@mui/icons-material/Layers"; 
interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
}

export default function Sidebar({
  mobileOpen,
  onClose,
  drawerWidth,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const primaryColor = "#172C4A";

  // Rotalar oluşturduğumuz sayfalara (/products, /operations, /count, /movements) bağlandı
  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: <DashboardOutlinedIcon /> },
    {
      title: "Ürünler",
      path: "/products", //products olarak güncellendi
      icon: <Inventory2OutlinedIcon />,
    },
    {
      title: "Depolar",
      path: "/warehouses",
      icon: <WarehouseOutlinedIcon />, // Depolar için özel ikon eklendi
    },
    {
      title: "Stok İşlemleri",
      path: "/operations",
      icon: <SyncAltOutlinedIcon />,
    },
    { title: "Depo Sayım", path: "/count", icon: <FactCheckOutlinedIcon /> },
    {
      title: "Hareket Geçmişi",
      path: "/movements",
      icon: <HistoryOutlinedIcon />,
    },
    {
      title: "Kullanıcı Yönetimi",
      path: "/users",
      icon: <PeopleOutlineOutlinedIcon />,
      adminOnly: true,
    },
    {
      title: "Sistem Ayarları",
      path: "/settings",
      icon: <SettingsOutlinedIcon />,
      adminOnly: true,
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Logo Alanı */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
          <LayersIcon sx={{ fontSize: 40, color: primaryColor }} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: primaryColor, letterSpacing: "-0.5px" }}
        >
          Entegre WMS
        </Typography>
      </Box>

      {/* Menü Listesi */}
      <List sx={{ px: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  onClose(); // Mobilde menüyü kapat
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "#EEF2FF" : "transparent",
                  color: isActive ? primaryColor : "#4B5563",
                  "&:hover": { bgcolor: isActive ? "#EEF2FF" : "#F3F4F6" },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? primaryColor : "#9CA3AF",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive ? 700 : 500, // Aktifken biraz daha belirgin yapıldı
                        fontSize: "0.875rem",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobil Sidebar (Geçici) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Masaüstü Sidebar (Sabit) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid #E5E7EB",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
