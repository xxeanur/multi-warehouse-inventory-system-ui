import { Box, Typography } from "@mui/material";

export default function InventoryCountHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#111827",
          mb: 0.5,
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        Depo Sayım Otomasyonu
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#6B7280", fontSize: { xs: "0.8rem", md: "0.9rem" } }}
      >
        Fiziki stok sayımlarını gerçekleştirin ve sistem senkronizasyonunu
        kontrol edin
      </Typography>
    </Box>
  );
}
