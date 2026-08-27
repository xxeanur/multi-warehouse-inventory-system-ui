import { Box, Typography, Button } from "@mui/material";
import OutputOutlinedIcon from "@mui/icons-material/OutputOutlined";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  isStaff: boolean;
  onCreateNew: () => void;
}

export default function OutboundListHeader({ isStaff, onCreateNew }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ bgcolor: "#EEF2FF", p: 1.5, borderRadius: 2 }}>
          <OutputOutlinedIcon sx={{ color: "#172C4A", fontSize: 28 }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.5px",
            }}
          >
            Mal Çıkış (Outbound)
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
            Depodan çıkacak ürünlerin sevkiyat fişlerini ve stok hareketlerini yönetin.
          </Typography>
        </Box>
      </Box>
      
      {!isStaff && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateNew}
          disableElevation
          sx={{
            bgcolor: "#172C4A",
            color: "#FFFFFF",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            py: 1,
            "&:hover": { bgcolor: "#0F1C2E" },
          }}
        >
          Yeni Fiş Ekle
        </Button>
      )}
    </Box>
  );
}