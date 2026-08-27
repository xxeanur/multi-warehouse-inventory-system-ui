import { Box, Typography, Chip, Divider } from "@mui/material";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { TransferOrderDetailDto } from "@/types/documents/transfer";

interface Props {
  line: TransferOrderDetailDto["lines"][number];
}

export default function TransferPendingLineItem({ line }: Props) {
  const isComplete = line.allocations && line.allocations.length > 0;

  return (
    <Box
      sx={{
        p: 2,
        mb: 3,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#111827" }}
        >
          {line.productName}{" "}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: "#6B7280" }}
          >
            ({line.productCode})
          </Typography>
        </Typography>

        <Chip
          label={`İstenen Transfer: ${line.expectedQuantity}`}
          size="small"
          sx={{ fontWeight: 700, bgcolor: "#F3F4F6", color: "#374151" }}
        />
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Typography
        variant="caption"
        sx={{ color: "#6B7280", fontWeight: 600, display: "block", mb: 1 }}
      >
        SİSTEMİN BELİRLEDİĞİ KAYNAK TOPLAMA RAFLARI:
      </Typography>

      {!isComplete ? (
        <Typography variant="body2" color="error">
          Sistem bu ürün için rezervasyon bulamadı!
        </Typography>
      ) : (
        line.allocations?.map((allocation, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5,
              mb: 1,
              bgcolor: "#F9FAFB",
              borderRadius: 1.5,
              border: "1px dashed #D1D5DB",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 600,
                color: "#172C4A",
              }}
            >
              <InventoryOutlinedIcon
                fontSize="small"
                sx={{ color: "#3B82F6" }}
              />
              Raf: {allocation.sourceShelfName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#059669" }}
            >
              {allocation.quantity} Adet Topla
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}
