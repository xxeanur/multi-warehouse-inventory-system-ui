"use client";

import { Box, Card, Typography, Chip, Avatar, Divider } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { RecentMovementDto } from "@/types/common/dashboard";

interface MovementsProps {
  recentMovements: RecentMovementDto[];
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
        {recentMovements.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", p: 3, textAlign: "center" }}
          >
            Henüz stok hareketi bulunmuyor.
          </Typography>
        ) : (
          recentMovements.map((movement, index) => {
            const isOutbound =
              movement.movementType === "Outbound" ||
              movement.movementType === "SupplierReturn" ||
              movement.movementType === "Scrap";
            const isInbound =
              movement.movementType === "Inbound" ||
              movement.movementType === "CustomerReturn";
            const isTransfer =
              movement.movementType === "WarehouseTransfer" ||
              movement.movementType === "ShelfTransfer";

            return (
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
                        bgcolor: isInbound
                          ? "#F0FDF4"
                          : isOutbound
                            ? "#FEF2F2"
                            : "#EEF2FF",
                        color: isInbound
                          ? "#059669"
                          : isOutbound
                            ? "#DC2626"
                            : "#4F46E5",
                      }}
                    >
                      {isInbound && <ArrowDownwardIcon fontSize="small" />}
                      {isOutbound && <ArrowUpwardIcon fontSize="small" />}
                      {(isTransfer || (!isInbound && !isOutbound)) && (
                        <SyncAltIcon fontSize="small" />
                      )}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontWeight: 600, color: "#111827" }}
                      >
                        {movement.productName}
                      </Typography>
                      <Typography
                        variant="caption"
                        noWrap
                        sx={{ color: "#6B7280", display: "block" }}
                      >
                        {movement.locationInfo}
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
                      {isOutbound ? "-" : "+"}
                      {movement.quantity} Adet
                    </Typography>
                    <Chip
                      label={movement.movementType}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.65rem",
                        height: "22px",
                        bgcolor: isInbound
                          ? "#D1FAE5"
                          : isOutbound
                            ? "#FEE2E2"
                            : "#E0E7FF",
                        color: isInbound
                          ? "#065F46"
                          : isOutbound
                            ? "#991B1B"
                            : "#3730A3",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#9CA3AF",
                        textAlign: "right",
                        minWidth: { sm: "115px" },
                      }}
                    >
                      {new Date(movement.movementDate).toLocaleString("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>
                {index !== recentMovements.length - 1 && <Divider />}
              </Box>
            );
          })
        )}
      </Box>
    </Card>
  );
}
