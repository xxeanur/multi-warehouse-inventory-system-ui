import { Box, Typography, Paper, Grid, Chip, Divider } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { OutboundOrderDetailDto } from "@/types/documents/outbound";

interface Props {
  order: OutboundOrderDetailDto;
  statusColors: { bg: string; text: string; label: string };
}

export default function OutboundInfoPanel({ order, statusColors }: Props) {
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
              label={order.statusName || statusColors.label}
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
            {order.movementTypeName}
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
            {order.warehouseName}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6B7280", fontWeight: 600 }}
          >
            HEDEF (GİDEN YER)
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
          >
            {order.destination}
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

        <Grid size={{ xs: 12, sm: 4 }}>
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

        {order.approvedByName && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", fontWeight: 600 }}
            >
              ONAYLAYAN
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
              <AccountCircleOutlinedIcon fontSize="small" />
              {order.approvedByName}
            </Typography>
          </Grid>
        )}

        {order.cancelledByName && (
          <Grid size={{ xs: 12, sm: 4 }}>
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
