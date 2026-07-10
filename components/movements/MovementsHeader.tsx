import { Box, Typography } from "@mui/material";

export default function MovementsHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
        Hareket Geçmişi
      </Typography>
      <Typography variant="body2" sx={{ color: "#6B7280" }}>
        Depo genelindeki tüm stok giriş, çıkış ve transfer loglarını inceleyin.
      </Typography>
    </Box>
  );
}