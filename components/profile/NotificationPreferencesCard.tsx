import { Box, Card, Typography, Switch, Divider } from "@mui/material";

export default function NotificationPreferencesCard() {
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
            Bana atanan transfer onayları için e-posta gönder.
          </Typography>
        </Box>
        <Switch defaultChecked color="primary" />
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
            Stok hareketlerini ve sistem duyurularını göster.
          </Typography>
        </Box>
        <Switch defaultChecked color="primary" />
      </Box>
    </Card>
  );
}
