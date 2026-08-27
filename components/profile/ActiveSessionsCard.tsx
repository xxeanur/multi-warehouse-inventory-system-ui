"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { authService } from "@/services/identity/authService";
import { ActiveSessionDto } from "@/types/identity/auth";
import { notifySuccess } from "@/lib/notificationService";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { useConfirm } from "@/contexts/ConfirmContext";

export default function ActiveSessionsCard() {
  const [sessions, setSessions] = useState<ActiveSessionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  const { confirm } = useConfirm();

  const fetchSessions = () => {
    setLoading(true);
    authService
      .getSessionsAsync()
      .then((data) => setSessions(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (tokenId: string, deviceName: string) => {
    const isConfirmed = await confirm({
      title: "Oturumu Sonlandır",
      description: `Bu işlem '${deviceName}' cihazındaki hesabınızdan çıkış yapacaktır. Emin misiniz?`,
      confirmText: "Evet, Kapat",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    authService.revokeSessionAsync(tokenId).then(() => {
      notifySuccess("Oturum başarıyla sonlandırıldı.");
      fetchSessions();
    });
  };

  const handleRevokeAllOthers = async () => {
    const isConfirmed = await confirm({
      title: "Tüm Oturumları Kapat",
      description:
        "Şu an kullandığınız cihaz HARİÇ, hesabınızın açık olduğu tüm diğer cihazlardan (telefon, tablet, vb.) çıkış yapılacaktır. Onaylıyor musunuz?",
      confirmText: "Hepsini Kapat",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    setIsRevokingAll(true);
    authService
      .revokeAllOtherSessionsAsync()
      .then(() => {
        notifySuccess("Diğer tüm cihazlardaki oturumlarınız sonlandırıldı.");
        fetchSessions();
      })
      .finally(() => setIsRevokingAll(false));
  };

  const getDeviceIcon = (deviceName: string) => {
    if (
      deviceName.includes("iPhone") ||
      deviceName.includes("Android") ||
      deviceName.includes("Mobile")
    )
      return <PhoneIphoneOutlinedIcon sx={{ color: "#6B7280" }} />;
    return <ComputerOutlinedIcon sx={{ color: "#059669" }} />;
  };

  const hasOtherSessions = sessions.length > 1;

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
        <ComputerOutlinedIcon sx={{ color: "#172C4A" }} /> Aktif Oturumlar
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#6B7280", display: "block", mb: 2 }}
      >
        Hesabınıza bağlı olan ve şu anda açık olan cihazlar.
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={24} sx={{ color: "#172C4A" }} />
        </Box>
      ) : (
        <>
          <List sx={{ p: 0, flexGrow: 1 }}>
            {sessions.map((session, index) => (
              <ListItem
                key={session.id}
                sx={{
                  px: 0,
                  py: 1.5,
                  borderBottom:
                    index !== sessions.length - 1
                      ? "1px solid #F3F4F6"
                      : "none",
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getDeviceIcon(session.deviceName)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#111827" }}
                    >
                      {session.deviceName} - {session.browser}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: "#6B7280" }}>
                      {session.isCurrentSession
                        ? "Şu an aktif"
                        : `Son görülme: ${formatDistanceToNow(new Date(session.lastAccessed), { addSuffix: true, locale: tr })}`}
                      {" • "}
                      {session.ipAddress}
                    </Typography>
                  }
                />
                {!session.isCurrentSession && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRevoke(session.id, session.deviceName)}
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Kapat
                  </Button>
                )}
              </ListItem>
            ))}
          </List>

          {hasOtherSessions && (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleRevokeAllOthers}
              disabled={isRevokingAll}
              startIcon={<WarningAmberOutlinedIcon />}
              sx={{
                mt: 2,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Diğer Tüm Oturumları Kapat
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
