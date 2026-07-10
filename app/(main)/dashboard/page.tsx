"use client";

import { Box, Grid } from "@mui/material";
import LayoutWrapper from "../../../components/LayoutWrapper";
import WarehouseMap from "@/components/dashboard/WarehouseMap";

import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import DashboardKPIs from "../../../components/dashboard/DashboardKPIs";
import DashboardCapacity from "../../../components/dashboard/DashboardCapacity";
import RecentMovements from "../../../components/dashboard/RecentMovements";

// Mock Veri
const recentMovements = [
  { id: 1, type: "INBOUND", product: "MacBook Pro M3", qty: 50, location: "Merkez Depo - Zone A", date: "10 dk önce" },
  { id: 2, type: "TRANSFER", product: "Dell UltraSharp Monitör", qty: 15, location: "Merkez -> Konya Şube", date: "45 dk önce" },
  { id: 3, type: "OUTBOUND", product: "Logitech MX Master 3", qty: 2, location: "Konya Şube - Raf 4", date: "1 saat önce" },
  { id: 4, type: "INBOUND", product: "Ergonomik Ofis Koltuğu", qty: 20, location: "Merkez Depo - Zone C", date: "3 saat önce" },
  { id: 5, type: "TRANSFER", product: "Type-C Çoklayıcı Hub", qty: 100, location: "Konya Şube -> Ankara Şube", date: "5 saat önce" },
];

export default function DashboardPage() {
  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", pb: 6 }}>
        
        <DashboardHeader />
        
        <DashboardKPIs />

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <WarehouseMap />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCapacity />
          </Grid>
        </Grid>

        <RecentMovements recentMovements={recentMovements} />

      </Box>
    </LayoutWrapper>
  );
}