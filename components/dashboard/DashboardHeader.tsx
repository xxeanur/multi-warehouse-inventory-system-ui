import { Box, Typography } from "@mui/material";

export default function DashboardHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
      >
        Sistem Özeti
      </Typography>
      <Typography variant="body2" sx={{ color: "#6B7280" }}>
        Depo hacimleri ve anlık stok durumları
      </Typography>
    </Box>
  );
}
