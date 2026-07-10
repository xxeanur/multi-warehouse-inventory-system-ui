import { Box, Card, Typography, Avatar, Divider } from "@mui/material";

export default function ProfileAvatarCard() {
  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
  };

  return (
    <Card
      elevation={0}
      sx={{
        ...sectionCardStyle,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          bgcolor: "#172C4A",
          opacity: 0.04,
          borderBottom: "1px solid #E5E7EB",
        }}
      />
      <Avatar
        sx={{
          width: 90,
          height: 90,
          bgcolor: "#172C4A",
          fontSize: "2.25rem",
          fontWeight: 700,
          mx: "auto",
          mt: 2,
          mb: 2,
          border: "4px solid #FFFFFF",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        EÇ
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827" }}>
        Esra Nur Çomak
      </Typography>
      <Typography
        variant="caption"
        sx={{
          bgcolor: "#EEF2FF",
          color: "#4F46E5",
          fontWeight: 700,
          px: 1.5,
          py: 0.5,
          borderRadius: 5,
          display: "inline-block",
          mt: 1,
        }}
      >
        Süper Admin
      </Typography>

      <Divider sx={{ my: 3, borderColor: "#F3F4F6" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 800, color: "#111827" }}
          >
            Aktif
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            Hesap Durumu
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
