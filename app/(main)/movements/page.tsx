"use client";

import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LayoutWrapper from "../../../components/LayoutWrapper";

import MovementsHeader from "../../../components/movements/MovementsHeader";
import MovementsFilter from "../../../components/movements/MovementsFilter";
import MovementsMobileList from "../../../components/movements/MovementsMobileList";
import MovementsDesktopTable from "../../../components/movements/MovementsDesktopTable";

const mockMovements = [
  {
    id: 1,
    type: "GİRİŞ",
    product: "MacBook Pro M3",
    sku: "SKU-1001",
    qty: "+50 Adet",
    location: "Merkez Depo - Zone A",
    time: "10 dk önce",
    operator: "Admin User",
  },
  {
    id: 2,
    type: "TRANSFER",
    product: "Dell UltraSharp Monitör",
    sku: "SKU-1002",
    qty: "15 Adet",
    location: "Merkez -> Konya Şube",
    time: "45 dk önce",
    operator: "Admin User",
  },
  {
    id: 3,
    type: "ÇIKIŞ",
    product: "Logitech MX Master 3",
    sku: "SKU-1088",
    qty: "-2 Adet",
    location: "Konya Şube - Raf 4",
    time: "1 saat önce",
    operator: "Depo Görevlisi",
  },
  {
    id: 4,
    type: "GİRİŞ",
    product: "Ergonomik Ofis Koltuğu",
    sku: "SKU-2055",
    qty: "+20 Adet",
    location: "Merkez Depo - Zone C",
    time: "3 saat önce",
    operator: "Merkez Sorumlusu",
  },
  {
    id: 5,
    type: "TRANSFER",
    product: "Type-C Çoklayıcı Hub",
    sku: "SKU-3012",
    qty: "100 Adet",
    location: "Konya Şube -> Ankara M.",
    time: "5 saat önce",
    operator: "Depo Görevlisi",
  },
];

export default function MovementsPage() {
  const [filterType, setFilterType] = useState("ALL");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 0 },
          pb: 4,
          overflowX: "hidden",
        }}
      >
        <MovementsHeader />

        <MovementsFilter
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {isMobile ? (
          <MovementsMobileList movements={mockMovements} />
        ) : (
          <MovementsDesktopTable movements={mockMovements} />
        )}
      </Box>
    </LayoutWrapper>
  );
}
