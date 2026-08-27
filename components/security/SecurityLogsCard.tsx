"use client";

import { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { auditService } from "@/services/common/auditService";
import { AuditLogDto, AuditActionType } from "@/types/common/audit";
import { formatDistanceToNow, format } from "date-fns";
import { tr } from "date-fns/locale";

export default function SecurityLogsCard() {
  const [logs, setLogs] = useState<AuditLogDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auditService
      .getMyRecentSecurityLogsAsync()
      .then((data) => setLogs(data))
      .catch((err) => console.error("Güvenlik logları çekilemedi", err))
      .finally(() => setLoading(false));
  }, []);

  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const getLogDetails = (log: AuditLogDto) => {
    switch (log.actionType) {
      case AuditActionType.Login:
        return {
          text: `Hesaba giriş yapıldı. (${log.newValues})`,
          color: "#059669",
        };
      case AuditActionType.Logout:
        return { text: "Hesaptan çıkış yapıldı.", color: "#6B7280" };
      case AuditActionType.PasswordChanged:
        return { text: "Hesap şifresi değiştirildi.", color: "#2563EB" };
      case AuditActionType.EmailChangeRequested:
        return {
          text: "E-posta değiştirme talebi oluşturuldu.",
          color: "#D97706",
        };
      case AuditActionType.EmailChanged:
        return {
          text: "E-posta adresi başarıyla güncellendi.",
          color: "#059669",
        };
      case AuditActionType.SessionRevoked:
        return {
          text: `Bir oturum sonlandırıldı. (${log.newValues})`,
          color: "#DC2626",
        };
      case AuditActionType.AllOtherSessionsRevoked:
        return {
          text: "Diğer tüm cihazlardaki oturumlar sonlandırıldı.",
          color: "#DC2626",
        };
      default:
        return { text: "Güvenlik işlemi gerçekleştirildi.", color: "#374151" };
    }
  };

  return (
    <Card elevation={0} sx={sectionCardStyle}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 800,
          color: "#111827",
          mb: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <HistoryOutlinedIcon sx={{ color: "#172C4A" }} /> Son Güvenlik
        Etkinlikleri
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#6B7280", display: "block", mb: 3 }}
      >
        Hesabınız üzerinden yapılan son veri değişiklikleri.
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "350px",
          pr: 1,
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={24} sx={{ color: "#172C4A" }} />
          </Box>
        ) : logs.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", textAlign: "center", py: 2 }}
          >
            Henüz bir güvenlik etkinliği bulunmuyor.
          </Typography>
        ) : (
          logs.map((log) => {
            const details = getLogDetails(log);
            return (
              <Box
                key={log.id}
                sx={{ pl: 2, borderLeft: `2px solid ${details.color}` }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", fontWeight: 600, display: "block" }}
                >
                  {formatDistanceToNow(new Date(log.createdDate), {
                    addSuffix: true,
                    locale: tr,
                  })}
                  {" • "}
                  {format(new Date(log.createdDate), "dd MMM yyyy, HH:mm", {
                    locale: tr,
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#374151", mt: 0.5, fontWeight: 500 }}
                >
                  {details.text}
                </Typography>
                {log.ipAddress && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: "0.7rem",
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    IP: {log.ipAddress}
                  </Typography>
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Card>
  );
}
