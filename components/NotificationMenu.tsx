"use client";

import { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Menu,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

// Sistem sağlığı için sahte canlı bildirim verileri
const mockNotifications = [
  {
    id: 1,
    title: "Kritik Stok Uyarısı",
    desc: "Dell Monitör stoğu Konya deposunda 5 adete düştü!",
    time: "10 dk önce",
    type: "CRITICAL",
    icon: <WarningAmberIcon fontSize="small" />,
    bgColor: "#FEF2F2",
    color: "#DC2626",
  },
  {
    id: 2,
    title: "Yeni Ürün Kabulü",
    desc: "Merkez Depo'ya 50 adet MacBook Pro giriş yaptı.",
    time: "45 dk önce",
    type: "INBOUND",
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    bgColor: "#F0FDF4",
    color: "#059669",
  },
  {
    id: 3,
    title: "Transfer Başlatıldı",
    desc: "Ankara -> Konya transfer rotası aktif duruma geçti.",
    time: "2 saat önce",
    type: "TRANSFER",
    icon: <SyncAltIcon fontSize="small" />,
    bgColor: "#EEF2FF",
    color: "#4F46E5",
  },
];

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: "#4B5563", p: 1 }}
      >
        <Badge
          badgeContent={mockNotifications.length}
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "#EF4444",
              color: "white",
              fontWeight: 700,
              fontSize: "0.65rem",
              height: 18,
              minWidth: 18,
            },
          }}
        >
          <NotificationsNoneIcon sx={{ fontSize: 22 }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
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
              width: 320,
              maxHeight: 450,
              borderRadius: 3,
              mt: 1.5,
              border: "1px solid #E5E7EB",
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Menü Başlık Alanı */}
        <Box sx={{ px: 2.5, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            Bildirimler
          </Typography>
          <Typography variant="caption" sx={{ bgcolor: "#F3F4F6", color: "#374151", fontWeight: 700, px: 1, py: 0.3, borderRadius: 1 }}>
            {mockNotifications.length} Yeni
          </Typography>
        </Box>
        
        <Divider sx={{ borderColor: "#F3F4F6" }} />

        {/* Bildirim Listesi */}
        <List sx={{ p: 0 }}>
          {mockNotifications.map((notif) => (
            <ListItem
              key={notif.id}
              alignItems="flex-start"
              sx={{
                px: 2.5,
                py: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { bgcolor: "#F9FAFB" },
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              <ListItemAvatar sx={{ mt: 0.5 }}>
                <Avatar sx={{ bgcolor: notif.bgColor, color: notif.color, width: 32, height: 32, borderRadius: 2 }}>
                  {notif.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>
                    {notif.title}
                  </Typography>
                }
                secondary={
                  <Box component="span">
                    <Typography component="span" variant="caption" sx={{ color: "#4B5563", display: "block", mt: 0.3, lineHeight: 1.4 }}>
                      {notif.desc}
                    </Typography>
                    <Typography component="span" variant="caption" sx={{ color: "#9CA3AF", display: "block", mt: 0.5, fontWeight: 500 }}>
                      {notif.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Tümünü Okundu İşaretle / Gör Butonu */}
        <Box sx={{ p: 1, bgcolor: "#FAFAFA", textAlign: "center" }}>
          <Button
            fullWidth
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "#172C4A",
              "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
            }}
          >
            Tümünü Okundu İşaretle
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}