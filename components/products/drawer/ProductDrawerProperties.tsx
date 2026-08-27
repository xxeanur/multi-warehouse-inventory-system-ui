import { Box, Typography } from "@mui/material";
import { ProductData } from "@/app/(main)/products/page";

interface Props {
  product: ProductData;
  unitName: string;
}

export default function ProductDrawerProperties({ product, unitName }: Props) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 4 }}>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Kategori</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{product.category}</Typography>
      </Box>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Bulunduğu Depo</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{product.warehouse}</Typography>
      </Box>
      <Box sx={{ bgcolor: "#FEF2F2", p: 2, borderRadius: 2, border: "1px solid #FECACA" }}>
        <Typography variant="caption" sx={{ color: "#991B1B", display: "block", mb: 0.5 }}>Kritik Seviye</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#DC2626" }}>{product.criticalLevel} {unitName}</Typography>
      </Box>
      <Box sx={{ bgcolor: "#F0FDF4", p: 2, borderRadius: 2, border: "1px solid #BBF7D0" }}>
        <Typography variant="caption" sx={{ color: "#166534", display: "block", mb: 0.5 }}>Toplam Stok</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#15803D" }}>{product.totalStock} {unitName}</Typography>
      </Box>
    </Box>
  );
}