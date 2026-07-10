import { Box, Card, Typography, Switch, Button } from "@mui/material";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

export default function TwoFactorAuthCard() {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: "#111827",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SecurityOutlinedIcon sx={{ color: "#172C4A" }} /> İki Faktörlü
          Doğrulama (2FA)
        </Typography>

        {/* Switch bileşeninin default renklerini tema rengimizle eziyoruz */}
        <Switch
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#172C4A",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#172C4A",
            },
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{ color: "#6B7280", display: "block", mb: 3 }}
      >
        Hesabınıza giriş yaparken şifrenize ek olarak mobil cihazınızdan (SMS
        veya Authenticator) onay kodu istenir.
      </Typography>

      <Box
        sx={{
          p: 2,
          bgcolor: "#F9FAFB",
          borderRadius: 2,
          border: "1px dashed #E5E7EB",
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
            Google Authenticator
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Uygulama üzerinden kod üretin.
          </Typography>
        </Box>

        {/* Butonun renklerini ve hover efektini temaya uygun hale getirdik */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            color: "#172C4A",
            borderColor: "#E5E7EB",
            "&:hover": {
              borderColor: "#172C4A",
              bgcolor: "#F3F4F6",
            },
          }}
        >
          Kurulum Yap
        </Button>
      </Box>
    </Card>
  );
}
