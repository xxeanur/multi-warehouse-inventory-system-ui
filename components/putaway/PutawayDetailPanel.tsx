import {
  Box,
  Card,
  Typography,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import PutawayLineItem, { SplitPlacement } from "./PutawayLineItem";
import { PutawayDetailDto } from "@/types/inventory/putaway";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";

interface Props {
  selectedOrder: PutawayDetailDto | null;
  selectedWarehouseId: string;
  zones: WarehouseZoneDto[];
  isSubmitting: boolean;
  onPlacementChange: (lineId: string, placements: SplitPlacement[]) => void;
  onSubmit: () => void;
}

export default function PutawayDetailPanel({
  selectedOrder,
  selectedWarehouseId,
  zones,
  isSubmitting,
  onPlacementChange,
  onSubmit,
}: Props) {
  if (!selectedOrder) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          border: "2px dashed #E5E7EB",
          borderRadius: 3,
          bgcolor: "#FAFAFA",
        }}
      >
        <SystemUpdateAltIcon sx={{ fontSize: 64, color: "#D1D5DB", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "#6B7280", fontWeight: 600 }}>
          İşlem Yapmak İçin Sol Taraftan Bir Fiş Seçin
        </Typography>
      </Box>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: "#F9FAFB",
          p: 2.5,
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{ bgcolor: "#EEF2FF", p: 1, borderRadius: 2, display: "flex" }}
          >
            <InventoryIcon sx={{ color: "#3B82F6" }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827", fontSize: "1.1rem" }}
            >
              Belge No: {selectedOrder.documentNumber}
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280" }}>
              Tür: {selectedOrder.documentType} İşlemi
            </Typography>
          </Box>
        </Box>

        <Chip
          label={`İşlem Yapılan Depo ID: ${selectedWarehouseId.substring(0, 8)}...`}
          sx={{
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            fontWeight: 600,
            color: "#4B5563",
          }}
        />
      </Box>

      <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#FAFAFA" }}>
        {selectedOrder.lines.map((line) => (
          <PutawayLineItem
            key={line.documentLineId}
            line={line}
            zones={zones}
            onPlacementChange={onPlacementChange}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 3,
          borderTop: "1px solid #E5E7EB",
          bgcolor: "#FFFFFF",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={onSubmit}
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CheckCircleOutlineIcon />
            )
          }
          disableElevation
          sx={{
            bgcolor: "#10B981",
            "&:hover": { bgcolor: "#059669" },
            px: 5,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {isSubmitting
            ? "İşleniyor..."
            : "Seçili Ürünleri Raflara Yerleştir (Kaydet)"}
        </Button>
      </Box>
    </Card>
  );
}
