import { Box, Typography, Paper, Grid, Chip, Divider } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import OutputOutlinedIcon from "@mui/icons-material/OutputOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { TransferOrderDetailDto } from "@/types/documents/transfer";

interface Props {
  order: TransferOrderDetailDto;
  statusColors: { bg: string; text: string; label: string };
}

export default function TransferInfoPanel({ order, statusColors }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600 }}
          >
            DURUM
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip
              label={statusColors.label}
              size="small"
              sx={{
                bgcolor: statusColors.bg,
                color: statusColors.text,
                fontWeight: 700,
                borderRadius: 1.5,
              }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600 }}
          >
            İŞLEM TÜRÜ
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
          >
            Depolar Arası Transfer
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600 }}
          >
            KAYNAK DEPO
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
          >
            {order.sourceWarehouseName}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600 }}
          >
            HEDEF DEPO
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
          >
            {order.targetWarehouseName}
          </Typography>
        </Grid>

        {order.description && (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", fontWeight: 600 }}
            >
              AÇIKLAMA
            </Typography>
            <Typography variant="body2" sx={{ color: "#374151", mt: 0.5 }}>
              {order.description}
            </Typography>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1, borderColor: "#F3F4F6" }} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600 }}
          >
            OLUŞTURAN
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#374151",
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <PersonOutlineIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
            {order.createdByName || "Bilinmiyor"}
          </Typography>
        </Grid>

        {order.dispatchedByName && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", fontWeight: 600 }}
            >
              YOLA ÇIKARAN (DISPATCH)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#D97706",
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <OutputOutlinedIcon fontSize="small" />
              {order.dispatchedByName}
            </Typography>
          </Grid>
        )}

        {order.receivedByName && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", fontWeight: 600 }}
            >
              TESLİM ALAN (RECEIVE)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#10B981",
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <SystemUpdateAltIcon fontSize="small" />
              {order.receivedByName}
            </Typography>
          </Grid>
        )}

        {order.cancelledByName && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", fontWeight: 600 }}
            >
              İPTAL EDEN
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#DC2626",
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <HighlightOffOutlinedIcon fontSize="small" />
              {order.cancelledByName}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
