import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";

interface ProductData {
  id: number;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  criticalLevel: number;
  totalStock: number;
}

interface ProductDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  product: ProductData | null;
  onEdit: () => void;
}

export default function ProductDetailDrawer({
  open,
  onClose,
  product,
  onEdit,
}: ProductDetailDrawerProps) {
  if (!product) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1300 }}
      slotProps={{
        paper: { sx: { width: { xs: "100%", sm: 420 }, bgcolor: "#FFFFFF" } },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* HEADER */}
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
            <Box
              sx={{
                bgcolor: "#F3F4F6",
                p: 1.5,
                borderRadius: 2,
                color: "#172C4A",
                display: "flex",
              }}
            >
              <ViewInArOutlinedIcon />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.2,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                {product.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280" }}>
                {product.sku}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2.5, md: 3 } }}>
          {/* TEMEL ÖZELLİKLER */}
          <Typography
            variant="subtitle2"
            sx={{
              color: "#9CA3AF",
              mb: 2,
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: "0.75rem",
            }}
          >
            ÜRÜN ÖZELLİKLERİ
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Kategori
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {product.category}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Bulunduğu Depo
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {product.warehouse}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                p: 2,
                borderRadius: 2,
                border: "1px solid #FECACA",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#991B1B", display: "block", mb: 0.5 }}
              >
                Kritik Seviye
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#DC2626" }}
              >
                {product.criticalLevel} Adet
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#F0FDF4",
                p: 2,
                borderRadius: 2,
                border: "1px solid #BBF7D0",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#166534", display: "block", mb: 0.5 }}
              >
                Toplam Stok
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#15803D" }}
              >
                {product.totalStock} Adet
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{ my: 3, borderStyle: "dashed", borderColor: "#E5E7EB" }}
          />

          {/* FİZİKSEL ÖZELLİKLER */}
          <Typography
            variant="subtitle2"
            sx={{
              color: "#9CA3AF",
              mb: 2,
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: "0.75rem",
            }}
          >
            FİZİKSEL ÖZELLİKLER
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Ebatlar (En x Boy x Yük.)
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {product.width} x {product.height} x {product.depth} cm
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Birim Ağırlık
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {product.weight} kg
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                gridColumn: "span 2",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
              >
                Birim Hacim (Desi / cm³)
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                {(
                  product.width *
                  product.height *
                  product.depth
                ).toLocaleString()}{" "}
                cm³
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            p: { xs: 2.5, md: 3 },
            borderTop: "1px solid #E5E7EB",
            bgcolor: "#FAFAFA",
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<DeleteOutlineOutlinedIcon />}
              sx={{
                color: "#DC2626",
                borderColor: "#DC2626",
                "&:hover": { bgcolor: "#FEF2F2", borderColor: "#DC2626" },
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Sil
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<EditOutlinedIcon />}
              disableElevation
              onClick={onEdit}
              sx={{
                bgcolor: "#172C4A",
                "&:hover": { bgcolor: "#0F1D33" },
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Düzenle
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
