import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import { ProductData } from "@/app/(main)/products/page";

interface Props {
  product: ProductData;
  onClose: () => void;
}

export default function ProductDrawerHeader({ product, onClose }: Props) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ bgcolor: "#F3F4F6", p: 1.5, borderRadius: 2, color: "#172C4A", display: "flex" }}>
          <ViewInArOutlinedIcon />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", lineHeight: 1.2, fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
            {product.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "#6B7280", display: "block" }}>
            {product.sku} {product.brand ? `• ${product.brand}` : ""}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onClose} size="small" sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}