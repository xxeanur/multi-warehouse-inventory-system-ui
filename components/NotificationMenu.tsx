"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  CircularProgress,
} from "@mui/material";

// İkonlar
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import OutputIcon from "@mui/icons-material/Output";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import CircleIcon from "@mui/icons-material/Circle";

// Servis ve Tipler
import { notificationService } from "@/services/common/notificationService";
import {
  NotificationDto,
  NotificationType,
  NotificationTargetType,
} from "@/types/common/notification";

// Tarih formatlama
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export default function NotificationMenu() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);

    const count = await notificationService.getMyUnreadCountAsync();
    setUnreadCount(count);

    const result = await notificationService.getMyPagedNotificationsAsync({
      pageNumber: 1,
      pageSize: 5,
    });
    setNotifications(result.data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchNotifications();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (!open) void fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsReadAsync();
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getRedirectUrl = (
    targetType: NotificationTargetType,
    targetId?: string | null,
  ) => {
    if (!targetId || targetType === NotificationTargetType.None) return null;

    switch (targetType) {
      case NotificationTargetType.Product:
        return `/products?productId=${targetId}`;
      case NotificationTargetType.InboundOrder:
        return `/documents/inbound/${targetId}`;
      case NotificationTargetType.OutboundOrder:
        return `/documents/outbound/${targetId}`;
      case NotificationTargetType.TransferOrder:
        return `/documents/transfer/${targetId}`;
      case NotificationTargetType.Warehouse:
        return `/warehouses/${targetId}`;
      default:
        return null;
    }
  };

  const handleNotificationClick = async (notif: NotificationDto) => {
    if (!notif.isRead) {
      await notificationService.markAsReadAsync(notif.id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n)),
      );
    }

    const redirectUrl = getRedirectUrl(notif.targetType, notif.targetId);
    if (redirectUrl) {
      handleClose();
      router.push(redirectUrl);
    }
  };

  const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CriticalStock:
        return {
          icon: <WarningAmberIcon fontSize="small" />,
          bgColor: "#FEF2F2",
          color: "#DC2626",
        };
      case NotificationType.Transfer:
        return {
          icon: <SyncAltIcon fontSize="small" />,
          bgColor: "#EEF2FF",
          color: "#4F46E5",
        };
      case NotificationType.Inbound:
        return {
          icon: <LocalShippingOutlinedIcon fontSize="small" />,
          bgColor: "#F0FDF4",
          color: "#059669",
        };
      case NotificationType.Outbound:
        return {
          icon: <OutputIcon fontSize="small" />,
          bgColor: "#FFFBEB",
          color: "#D97706",
        };
      case NotificationType.Security:
        return {
          icon: <GppMaybeOutlinedIcon fontSize="small" />,
          bgColor: "#F3F4F6",
          color: "#374151",
        };
      default:
        return {
          icon: <NotificationsNoneIcon fontSize="small" />,
          bgColor: "#F3F4F6",
          color: "#6B7280",
        };
    }
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ color: "#4B5563", p: 1 }}
      >
        <Badge
          badgeContent={unreadCount}
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "#EF4444",
              color: "white",
              fontWeight: 700,
              fontSize: "0.65rem",
              height: 18,
              minWidth: 18,
              display: unreadCount > 0 ? "flex" : "none",
            },
          }}
        >
          <NotificationsNoneIcon sx={{ fontSize: 22 }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 340,
              maxHeight: 500,
              borderRadius: 3,
              mt: 1.5,
              border: "1px solid #E5E7EB",
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            },
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#111827" }}
          >
            Bildirimler
          </Typography>
          {unreadCount > 0 && (
            <Typography
              variant="caption"
              sx={{
                bgcolor: "#F3F4F6",
                color: "#374151",
                fontWeight: 700,
                px: 1,
                py: 0.3,
                borderRadius: 1,
              }}
            >
              {unreadCount} Yeni
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderColor: "#F3F4F6" }} />

        <List sx={{ p: 0, maxHeight: 350, overflowY: "auto" }}>
          {loading && notifications.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={24} sx={{ color: "#172C4A" }} />
            </Box>
          ) : notifications.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: "#6B7280", textAlign: "center", py: 4 }}
            >
              Henüz yeni bir bildiriminiz yok.
            </Typography>
          ) : (
            notifications.map((notif) => {
              const style = getNotificationStyle(notif.type);

              return (
                <ListItem
                  key={notif.id}
                  alignItems="flex-start"
                  onClick={() => void handleNotificationClick(notif)}
                  sx={{
                    px: 2.5,
                    py: 2,
                    cursor: "pointer",
                    transition: "0.2s",
                    bgcolor: notif.isRead ? "transparent" : "#F8FAFC",
                    "&:hover": { bgcolor: "#F3F4F6" },
                    borderBottom: "1px solid #F3F4F6",
                    position: "relative",
                  }}
                >
                  {!notif.isRead && (
                    <CircleIcon
                      sx={{
                        color: "#3B82F6",
                        fontSize: 10,
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}

                  <ListItemAvatar sx={{ mt: 0.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: style.bgColor,
                        color: style.color,
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                      }}
                    >
                      {style.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: notif.isRead ? 600 : 700,
                          color: "#111827",
                          lineHeight: 1.3,
                        }}
                      >
                        {notif.title}
                      </Typography>
                    }
                    secondary={
                      <Box component="span">
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{
                            color: "#4B5563",
                            display: "block",
                            mt: 0.3,
                            lineHeight: 1.4,
                          }}
                        >
                          {notif.message}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{
                            color: "#9CA3AF",
                            display: "block",
                            mt: 0.5,
                            fontWeight: 500,
                          }}
                        >
                          {formatDistanceToNow(new Date(notif.createdDate), {
                            addSuffix: true,
                            locale: tr,
                          })}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })
          )}
        </List>

        {notifications.length > 0 && (
          <Box
            sx={{
              p: 1,
              bgcolor: "#FAFAFA",
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #F3F4F6",
            }}
          >
            <Button
              size="small"
              onClick={() => void handleMarkAllAsRead()}
              disabled={unreadCount === 0}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "#6B7280",
              }}
            >
              Tümünü Okundu İşaretle
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleClose();
                router.push("/notifications");
              }}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "#172C4A",
              }}
            >
              Tümünü Gör
            </Button>
          </Box>
        )}
      </Menu>
    </Box>
  );
}
