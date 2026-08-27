"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";
import { WarehouseOccupancyDto } from "@/types/common/dashboard";

interface DashboardCapacityProps {
  occupancies: WarehouseOccupancyDto[];
}

export default function DashboardCapacity({
  occupancies,
}: DashboardCapacityProps) {
  const cardStyle = {
    borderRadius: 4,
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F3F4F6",
    height: "100%",
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 90)
      return { bg: "rgba(255, 56, 92, 0.15)", bar: "#FF385C", text: "#FF385C" };
    if (rate >= 70) return { bg: "#FEF3C7", bar: "#F59E0B", text: "#F59E0B" };
    return { bg: "#D1FAE5", bar: "#059669", text: "#059669" };
  };

  return (
    <Card
      elevation={0}
      sx={{ ...cardStyle, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid #F3F4F6" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "#111827" }}
        >
          Kapasite Kullanımı
        </Typography>
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {occupancies.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ color: "#6B7280", textAlign: "center" }}
          >
            Veri bulunamadı.
          </Typography>
        ) : (
          occupancies.map((wh) => {
            const colors = getProgressColor(wh.occupancyRate);
            return (
              <Box key={wh.warehouseName}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#374151" }}
                  >
                    {wh.warehouseName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: colors.text }}
                  >
                    %{wh.occupancyRate}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={wh.occupancyRate}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: colors.bg,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: colors.bar,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
