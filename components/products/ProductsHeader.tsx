import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ProductsHeaderProps {
  onOpenModal: () => void;
}

export default function ProductsHeader({ onOpenModal }: ProductsHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        mb: 4,
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#111827",
            mb: 0.5,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          Ürün Yönetimi
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#6B7280", fontSize: { xs: "0.8rem", md: "0.875rem" } }}
        >
          Sistemde kayıtlı tüm ürünleri ve stok durumlarını yönetin
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        disableElevation
        onClick={onOpenModal}
        sx={{
          bgcolor: "#172C4A",
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,
          px: 3,
          width: { xs: "100%", sm: "auto" },
          "&:hover": { bgcolor: "#0F1D33" },
        }}
      >
        Yeni Ürün
      </Button>
    </Box>
  );
}
