"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Switch,
  Divider,
  CircularProgress,
} from "@mui/material";

interface NotificationPreferencesProps {
  receiveEmailNotifications: boolean;
  receiveInAppNotifications: boolean;
  onToggleUpdate: (
    field: "receiveEmailNotifications" | "receiveInAppNotifications",
    newValue: boolean,
  ) => Promise<void>;
}

export default function NotificationPreferencesCard({
  receiveEmailNotifications,
  receiveInAppNotifications,
  onToggleUpdate,
}: NotificationPreferencesProps) {
  const [loadingField, setLoadingField] = useState<string | null>(null);

  const handleToggle = async (
    field: "receiveEmailNotifications" | "receiveInAppNotifications",
    currentValue: boolean,
  ) => {
    setLoadingField(field);
    try {
      await onToggleUpdate(field, !currentValue);
    } catch (error) {
      console.error("Tercih güncellenirken hata oluştu", error);
    } finally {
      setLoadingField(null);
    }
  };

  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
  };

  return (
    <Card elevation={0} sx={sectionCardStyle}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 800, color: "#111827", mb: 3 }}
      >
        Kişisel Bildirim Tercihleri
      </Typography>

      {/* E-POSTA BİLDİRİMLERİ */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            E-Posta Bildirimleri
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Bana atanan transfer onayları ve güvenlik işlemleri için e-posta
            gönder.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {loadingField === "receiveEmailNotifications" && (
            <CircularProgress size={16} />
          )}
          <Switch
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#172C4A",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#172C4A",
              },
            }}
            checked={receiveEmailNotifications}
            onChange={() =>
              handleToggle(
                "receiveEmailNotifications",
                receiveEmailNotifications,
              )
            }
            disabled={loadingField !== null}
            color="primary"
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: "#F3F4F6" }} />

  
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            Uygulama İçi Uyarılar
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Stok hareketlerini, mal kabulleri ve sistem duyurularını arayüzde
            göster.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {loadingField === "receiveInAppNotifications" && (
            <CircularProgress size={16} />
          )}
          <Switch
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#172C4A",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#172C4A",
              },
            }}
            checked={receiveInAppNotifications}
            onChange={() =>
              handleToggle(
                "receiveInAppNotifications",
                receiveInAppNotifications,
              )
            }
            disabled={loadingField !== null}
            color="primary"
          />
        </Box>
      </Box>
    </Card>
  );
}
