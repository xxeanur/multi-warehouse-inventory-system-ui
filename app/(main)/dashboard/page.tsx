"use client";

import { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";
import WarehouseMap from "@/components/dashboard/WarehouseMap";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardKPIs from "@/components/dashboard/DashboardKPIs";
import DashboardCapacity from "@/components/dashboard/DashboardCapacity";
import RecentMovements from "@/components/dashboard/RecentMovements";

import { dashboardService } from "@/services/common/dashboardService";
import { DashboardDto } from "@/types/common/dashboard";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await dashboardService.getDashboardDataAsync();
        setData(dashboardData);
      } catch (error) {
        console.error("Dashboard verisi çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <LayoutWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      </LayoutWrapper>
    );
  }

  if (!data) {
    return (
      <LayoutWrapper>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Veriler yüklenemedi. Lütfen daha sonra tekrar deneyiniz.
          </Typography>
        </Box>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", pb: 6 }}>
        <DashboardHeader
          totalWarehouses={data.totalWarehouses}
          totalActiveStocks={data.totalActiveStocks}
        />

        <DashboardKPIs
          totalProducts={data.totalProducts}
          criticalStockCount={data.criticalStocks.length}
          dailyMovementsCount={data.dailyMovementsCount}
          movementIncreasePercentage={data.movementIncreasePercentage}
        />

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <WarehouseMap locations={data.warehouseOccupancies} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCapacity occupancies={data.warehouseOccupancies} />
          </Grid>
        </Grid>

        <RecentMovements recentMovements={data.recentMovements} />
      </Box>
    </LayoutWrapper>
  );
}
