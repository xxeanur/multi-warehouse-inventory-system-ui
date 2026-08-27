import { Box, Typography } from "@mui/material";
import { ProductData } from "@/app/(main)/products/page";

interface Props {
  product: ProductData;
  unitName: string;
}

export default function ProductDrawerPhysicalStats({ product, unitName }: Props) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Ebatlar (E x B x Y)</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{product.width} x {product.height} x {product.depth} cm</Typography>
      </Box>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Birim Ağırlık</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{product.weight} kg</Typography>
      </Box>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Ölçü Birimi</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>{unitName}</Typography>
      </Box>
      <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 2, border: "1px solid #E5E7EB" }}>
        <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 0.5 }}>Birim Hacim (cm³)</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
          {(product.width * product.height * product.depth).toLocaleString()} cm³
        </Typography>
      </Box>
    </Box>
  );
}