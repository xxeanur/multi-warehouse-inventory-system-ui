import { Box, Typography } from "@mui/material";

export default function ProfileHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}
      >
        Profilim
      </Typography>
      <Typography variant="body2" sx={{ color: "#6B7280" }}>
        Kişisel erişim yetkileri ve oturum yönetimi
      </Typography>
    </Box>
  );
}
