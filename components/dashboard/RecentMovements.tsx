import { Box, Card, Typography, Chip, Avatar, Divider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

interface MovementData {
  id: number;
  type: string;
  product: string;
  qty: number;
  location: string;
  date: string;
}

interface MovementsProps {
  recentMovements: MovementData[];
}

export default function RecentMovements({ recentMovements }: MovementsProps) {
  const cardStyle = {
    borderRadius: 3,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
    border: "1px solid #E5E7EB",
  };

  return (
    <Card elevation={0} sx={cardStyle}>
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2.5,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "#111827" }}
        >
          Son Stok Hareketleri
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {recentMovements.map((movement, index) => (
          <Box key={movement.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                p: { xs: 2, sm: 3 },
                "&:hover": { bgcolor: "#F9FAFB" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2 },
                  flexGrow: 1,
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    bgcolor:
                      movement.type === "INBOUND"
                        ? "#F0FDF4"
                        : movement.type === "OUTBOUND"
                          ? "#FEF2F2"
                          : "#EEF2FF",
                    color:
                      movement.type === "INBOUND"
                        ? "#059669"
                        : movement.type === "OUTBOUND"
                          ? "#DC2626"
                          : "#4F46E5",
                  }}
                >
                  {movement.type === "INBOUND" && (
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                  {movement.type === "OUTBOUND" && (
                    <ArrowUpwardIcon fontSize="small" />
                  )}
                  {movement.type === "TRANSFER" && (
                    <SyncAltIcon fontSize="small" />
                  )}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ fontWeight: 600, color: "#111827" }}
                  >
                    {movement.product}
                  </Typography>
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{ color: "#6B7280", display: "block" }}
                  >
                    {movement.location}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-end", sm: "center" },
                  gap: { xs: 0.5, sm: 4 },
                  flexShrink: 0,
                  ml: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#374151" }}
                >
                  {movement.type === "OUTBOUND" ? "-" : "+"}
                  {movement.qty} Adet
                </Typography>
                <Chip
                  label={movement.type}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.65rem",
                    height: "22px",
                    bgcolor:
                      movement.type === "INBOUND"
                        ? "#D1FAE5"
                        : movement.type === "OUTBOUND"
                          ? "#FEE2E2"
                          : "#E0E7FF",
                    color:
                      movement.type === "INBOUND"
                        ? "#065F46"
                        : movement.type === "OUTBOUND"
                          ? "#991B1B"
                          : "#3730A3",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9CA3AF",
                    textAlign: "right",
                    minWidth: { sm: "75px" },
                  }}
                >
                  {movement.date}
                </Typography>
              </Box>
            </Box>
            {index !== recentMovements.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Card>
  );
}
