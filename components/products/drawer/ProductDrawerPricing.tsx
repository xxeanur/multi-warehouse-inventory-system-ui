import { Box, Typography } from "@mui/material";

interface Props {
  costPrice: number;
  unitPrice: number;
}

export default function ProductDrawerPricing({ costPrice, unitPrice }: Props) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 4 }}>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Birim Maliyet</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{costPrice} ₺</Typography>
      </Box>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Birim Satış Fiyatı</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{unitPrice} ₺</Typography>
      </Box>
    </Box>
  );
}