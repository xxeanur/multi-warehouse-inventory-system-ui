"use client";

import { Box, Grid } from "@mui/material";
import LayoutWrapper from "../../../components/LayoutWrapper";

// Az önce oluşturduğumuz alt bileşenleri içeri alıyoruz
import InventoryCountHeader from "../../../components/count/InventoryCountHeader";
import InventoryCountSummary from "../../../components/count/InventoryCountSummary";
import InventoryCountForm from "../../../components/count/InventoryCountForm";
import InventoryCountTable from "../../../components/count/InventoryCountTable";

// Mock Veriler
const products = [
  "MacBook Pro M3",
  "Dell UltraSharp Monitör",
  "Logitech MX Master 3",
];
const shelves = ["A1-01", "A1-02", "B2-05", "C3-10"];
const activeCounts = [
  {
    id: 1,
    sku: "SKU-1001",
    name: "MacBook Pro M3",
    shelf: "A1-01",
    systemQty: 45,
    countedQty: 45,
    status: "Eşleşti",
  },
  {
    id: 2,
    sku: "SKU-1002",
    name: "Dell UltraSharp Monitör",
    shelf: "A1-02",
    systemQty: 15,
    countedQty: 14,
    status: "Eksik",
  },
  {
    id: 3,
    sku: "SKU-1088",
    name: "Logitech MX Master 3",
    shelf: "B2-05",
    systemQty: 8,
    countedQty: 10,
    status: "Fazla",
  },
];

export default function InventoryCountPage() {
  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* 1. Başlık Alanı */}
        <InventoryCountHeader />

        {/* 2. Özet Kartları */}
        <InventoryCountSummary />

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* 3. Sol Form */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <InventoryCountForm products={products} shelves={shelves} />
          </Grid>

          {/* 4. Sağ Tablo */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <InventoryCountTable activeCounts={activeCounts} />
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
