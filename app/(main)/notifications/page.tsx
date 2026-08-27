"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Pagination,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";

// İkonlar
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import OutputIcon from "@mui/icons-material/Output";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import LayoutWrapper from "@/components/LayoutWrapper";
import { notificationService } from "@/services/common/notificationService";
import {
  NotificationDto,
  NotificationType,
  NotificationTargetType,
} from "@/types/common/notification";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchNotifications = useCallback(async (currentPage: number) => {
    setLoading(true);
    const result = await notificationService.getMyPagedNotificationsAsync({
      pageNumber: currentPage,
      pageSize: pageSize,
    });
    setNotifications(result.data);

    if (result.totalPages) {
      setTotalPages(result.totalPages);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchNotifications(page);
  }, [page, fetchNotifications]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsReadAsync();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await notificationService.removeAsync(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Akıllı ve Kırılmaz Yönlendirme (ESLint Uyumlu - ANY KULLANILMADI)
  const getRedirectUrl = (
    targetType: NotificationTargetType,
    targetId?: string | null,
  ) => {
    console.log(
      "🔍 API'DEN GELEN TİP:",
      targetType,
      "| API'DEN GELEN ID:",
      targetId,
    );

    if (
      !targetId ||
      targetType === NotificationTargetType.None ||
      targetType.toString() === "None" ||
      targetType.toString() === "0"
    )
      return null;

    const typeStr = targetType.toString();

    switch (typeStr) {
      case "1":
      case "Product":
        return `/products?productId=${targetId}`;
      case "2":
      case "InboundOrder":
        return `/documents/inbound/${targetId}`;
      case "3":
      case "OutboundOrder":
        return `/documents/outbound/${targetId}`;
      case "4":
      case "TransferOrder":
        return `/documents/transfer/${targetId}`;
      case "5":
      case "Warehouse":
        return `/warehouses/${targetId}`;
      default:
        console.warn("⚠️ EŞLEŞEN TÜR BULUNAMADI! TypeStr:", typeStr);
        return null;
    }
  };

  const handleNotificationClick = async (notif: NotificationDto) => {
    const redirectUrl = getRedirectUrl(notif.targetType, notif.targetId);
    console.log("🚀 GİDİLECEK ROTA:", redirectUrl);

    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      console.error("❌ Yönlendirme iptal: URL null döndü.");
    }

    // Arka planda okundu işaretle (hatalar UI'ı bloklamaz)
    if (!notif.isRead) {
      try {
        await notificationService.markAsReadAsync(notif.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n)),
        );
      } catch (error) {
        console.error("Okundu işlemi başarısız:", error);
      }
    }
  };

  const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CriticalStock:
        return {
          icon: <WarningAmberIcon />,
          bgColor: "#FEF2F2",
          color: "#DC2626",
        };
      case NotificationType.Transfer:
        return { icon: <SyncAltIcon />, bgColor: "#EEF2FF", color: "#4F46E5" };
      case NotificationType.Inbound:
        return {
          icon: <LocalShippingOutlinedIcon />,
          bgColor: "#F0FDF4",
          color: "#059669",
        };
      case NotificationType.Outbound:
        return { icon: <OutputIcon />, bgColor: "#FFFBEB", color: "#D97706" };
      case NotificationType.Security:
        return {
          icon: <GppMaybeOutlinedIcon />,
          bgColor: "#F3F4F6",
          color: "#374151",
        };
      default:
        return {
          icon: <NotificationsNoneIcon />,
          bgColor: "#F3F4F6",
          color: "#6B7280",
        };
    }
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "800px", margin: "0 auto", pt: 4, pb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
            Tüm Bildirimler
          </Typography>
          <Button
            startIcon={<DoneAllIcon />}
            onClick={() => void handleMarkAllAsRead()}
            sx={{
              textTransform: "none",
              color: "#4B5563",
              bgcolor: "#F3F4F6",
              "&:hover": { bgcolor: "#E5E7EB" },
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Tümünü Okundu İşaretle
          </Button>
        </Box>

        <Card
          elevation={0}
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress sx={{ color: "#172C4A" }} />
            </Box>
          ) : notifications.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <NotificationsNoneIcon
                sx={{ fontSize: 48, color: "#D1D5DB", mb: 2 }}
              />
              <Typography variant="h6" sx={{ color: "#4B5563" }}>
                Bildirim bulunamadı
              </Typography>
              <Typography variant="body2" sx={{ color: "#9CA3AF", mt: 1 }}>
                Geçmişe dönük herhangi bir bildiriminiz bulunmamaktadır.
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.map((notif, index) => {
                const style = getNotificationStyle(notif.type);
                return (
                  <Box key={notif.id}>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => void handleNotificationClick(notif)}
                      sx={{
                        p: 3,
                        cursor: "pointer",
                        bgcolor: notif.isRead ? "#FFFFFF" : "#F8FAFC",
                        "&:hover": { bgcolor: "#F3F4F6" },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemAvatar sx={{ mt: 0.5, mr: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: style.bgColor,
                            color: style.color,
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                          }}
                        >
                          {style.icon}
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        disableTypography
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            {!notif.isRead && (
                              <CircleIcon
                                sx={{ color: "#3B82F6", fontSize: 12 }}
                              />
                            )}
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: notif.isRead ? 600 : 700,
                                color: "#111827",
                              }}
                            >
                              {notif.title}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "#4B5563", mb: 1, lineHeight: 1.5 }}
                            >
                              {notif.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#9CA3AF",
                                fontWeight: 500,
                                display: "block",
                              }}
                            >
                              {formatDistanceToNow(
                                new Date(notif.createdDate),
                                { addSuffix: true, locale: tr },
                              )}
                            </Typography>
                          </Box>
                        }
                      />

                      <IconButton
                        size="small"
                        onClick={(e) => void handleDelete(e, notif.id)}
                        sx={{
                          color: "#9CA3AF",
                          "&:hover": { color: "#EF4444", bgcolor: "#FEF2F2" },
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </List>
          )}
        </Card>

        {!loading && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  "&.Mui-selected": { bgcolor: "#172C4A", color: "#FFFFFF" },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </LayoutWrapper>
  );
}
