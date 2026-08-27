"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

interface SupplierHeaderProps {
  isSuperAdmin: boolean;
  onAddClick: () => void;
}

export default function SupplierHeader({ isSuperAdmin, onAddClick }: SupplierHeaderProps) {
  const primaryColor = "#172C4A";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        mb: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            bgcolor: "#EEF2FF",
            p: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocalShippingOutlinedIcon
            sx={{ color: primaryColor, fontSize: 28 }}
          />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#111827" }}
          >
            Tedarikçi Yönetimi
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Sistemdeki iş ortaklarını ve tedarikçileri buradan
            yönetebilirsiniz.
          </Typography>
        </Box>
      </Box>

      {isSuperAdmin && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{
            bgcolor: primaryColor,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: 2,
            width: { xs: "100%", sm: "auto" },
            "&:hover": { bgcolor: "#0F1D33" },
          }}
        >
          Yeni Tedarikçi Ekle
        </Button>
      )}
    </Box>
  );
}