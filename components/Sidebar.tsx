"use client";

import { useState, useEffect } from "react";
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
  Collapse,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

import LayersIcon from "@mui/icons-material/Layers";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
}

interface MenuItemDef {
  title: string;
  path: string;
  icon: React.ReactNode;
  staffHidden?: boolean;
}

export default function Sidebar({
  mobileOpen,
  onClose,
  drawerWidth,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const primaryColor = "#172C4A";

  const [openSettings, setOpenSettings] = useState(false);
  const [openDocuments, setOpenDocuments] = useState(false);

 
  const [isStaff, setIsStaff] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    const userContextStr = localStorage.getItem("userContext");
    if (userContextStr) {
      try {
        const user = JSON.parse(userContextStr);
        if (user.role === "Staff" || user.role === 2) {
          setIsStaff(true);
        }
      } catch (error) {
        console.error("User context parse edilemedi", error);
      }
    }
    setIsMounted(true); 
  }, []);

  const topMenuItems: MenuItemDef[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlinedIcon />,
      staffHidden: true,
    },
    { title: "Ürünler", path: "/products", icon: <Inventory2OutlinedIcon /> },
    {
      title: "Depolar",
      path: "/warehouses",
      icon: <WarehouseOutlinedIcon />,
      staffHidden:false ,
    },
  ];

  const documentItems: MenuItemDef[] = [
    {
      title: "Mal Kabul (Inbound)",
      path: "/documents/inbound",
      icon: <InputIcon />,
    },
    {
      title: "Sevkiyat (Outbound)",
      path: "/documents/outbound",
      icon: <OutputIcon />,
    },
    {
      title: "Transfer İşlemleri",
      path: "/documents/transfer",
      icon: <SwapHorizIcon />,
    },
  ];

  const operationItems: MenuItemDef[] = [
    {
      title: "Rafa Yerleştirme",
      path: "/putaway",
      icon: <MoveToInboxOutlinedIcon />,
    },
    { title: "Depo Sayım", path: "/count", icon: <FactCheckOutlinedIcon /> },
    {
      title: "Stok Defteri (Ledger)",
      path: "/movements",
      icon: <HistoryOutlinedIcon />,
      staffHidden: true,
    },
  ];

  const settingsItems: MenuItemDef[] = [
    {
      title: "Kategoriler",
      path: "/definitions/categories",
      icon: <CategoryOutlinedIcon />,
    },
    {
      title: "Tedarikçiler",
      path: "/definitions/suppliers",
      icon: <LocalShippingOutlinedIcon />,
    },
  ];

  const bottomItems: MenuItemDef[] = [
    {
      title: "Kullanıcı Yönetimi",
      path: "/users",
      icon: <PeopleOutlineOutlinedIcon />,
      staffHidden: true,
    }
  ];

  const renderMenuItem = (
    item: MenuItemDef,
    isNested: boolean = false,
    extraMarginTop: boolean = false,
  ) => {
    if (isStaff && item.staffHidden) return null;

    const isActive = pathname.startsWith(item.path);

    return (
      <ListItem
        key={item.title}
        disablePadding
        sx={{ mb: 0.5, mt: extraMarginTop ? 1 : 0 }}
      >
        <ListItemButton
          onClick={() => {
            router.push(item.path);
            if (mobileOpen) onClose();
          }}
          sx={{
            borderRadius: 2,
            pl: isNested ? 4 : undefined,
            bgcolor: isActive ? "#EEF2FF" : "transparent",
            color: isActive ? primaryColor : "#4B5563",
            "&:hover": { bgcolor: isActive ? "#EEF2FF" : "#F3F4F6" },
          }}
        >
          <ListItemIcon
            sx={{ color: isActive ? primaryColor : "#9CA3AF", minWidth: 40 }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            slotProps={{
              primary: {
                sx: {
                  fontWeight: isActive ? 700 : 500,
                  fontSize: isNested ? "0.85rem" : "0.875rem",
                },
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <LayersIcon sx={{ fontSize: 40, color: primaryColor }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: primaryColor, letterSpacing: "-0.5px" }}
        >
          Entegre WMS
        </Typography>
      </Box>

      <List
        sx={{
          px: 2,
          flex: 1,
          overflowY: "auto",
          opacity: isMounted ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {topMenuItems.map((item) => renderMenuItem(item))}

        <ListItem disablePadding sx={{ mb: 0.5, mt: 1 }}>
          <ListItemButton
            onClick={() => setOpenDocuments(!openDocuments)}
            sx={{ borderRadius: 2, "&:hover": { bgcolor: "#F3F4F6" } }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "#9CA3AF" }}>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Belge Yönetimi"
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#374151",
                  },
                },
              }}
            />
            {openDocuments ? (
              <ExpandLess sx={{ color: "#9CA3AF" }} />
            ) : (
              <ExpandMore sx={{ color: "#9CA3AF" }} />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={openDocuments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {documentItems.map((item) => renderMenuItem(item, true))}
          </List>
        </Collapse>

        {operationItems.map((item, index) =>
          renderMenuItem(item, false, index === 0),
        )}

        <Box sx={{ mt: 2 }} />

        {!isStaff && (
          <>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => setOpenSettings(!openSettings)}
                sx={{ borderRadius: 2, "&:hover": { bgcolor: "#F3F4F6" } }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "#9CA3AF" }}>
                  <TuneOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Tanımlamalar"
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "#4B5563",
                      },
                    },
                  }}
                />
                {openSettings ? (
                  <ExpandLess sx={{ color: "#9CA3AF" }} />
                ) : (
                  <ExpandMore sx={{ color: "#9CA3AF" }} />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={openSettings} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {settingsItems.map((item) => renderMenuItem(item, true))}
              </List>
            </Collapse>
            <Box sx={{ mt: 2 }} />
          </>
        )}

        {bottomItems.map((item) => renderMenuItem(item))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
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
            zIndex: 1300,
          },
        }}
      >
        {drawerContent}
      </Drawer>
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
