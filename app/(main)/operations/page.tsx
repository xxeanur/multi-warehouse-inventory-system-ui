"use client";

import { useState } from "react";
import { Box, Card, Typography, Tabs, Tab, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import LayoutWrapper from "../../../components/LayoutWrapper";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

// Parçaladığımız Bileşenleri (Component) import ediyoruz
import InboundTab from "@/components/operations/InboundTab";
import OutboundTab from "@/components/operations/OutboundTab";
import TransferTab from "@/components/operations/TransferTab";
import SummaryPanel from "@/components/operations/SummaryPanel";

const products = [
  "MacBook Pro M3",
  "Dell UltraSharp Monitör",
  "Ergonomik Ofis Koltuğu",
  "Type-C Çoklayıcı Hub",
];

const warehouses = [
  { name: "Konya Merkez Depo", capacity: 85, color: "#FF385C" },
  { name: "Teknokent Şube", capacity: 42, color: "#10B981" },
  { name: "Ankara Transfer Merkezi", capacity: 78, color: "#F5A623" },
];

const zones = ["Zone A", "Zone B", "Zone C"];
const shelves = ["A1-01", "A1-02", "B2-05", "C3-10"];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`operation-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: { xs: 2, md: 4 }, pb: 2 }}>{children}</Box>
      )}
    </div>
  );
}

export default function OperationsPage() {
  const [tabValue, setTabValue] = useState(0);

  // Seçili depoları tutan stateler (Özet paneli ve bileşenler için)
  const [sourceWarehouse, setSourceWarehouse] = useState(warehouses[0].name);
  const [targetWarehouse, setTargetWarehouse] = useState(warehouses[2].name);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Tipleri hatasız çalışan ortak stil objemiz
  const inputStyle: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": {
      fontSize: { xs: "0.85rem", md: "1rem" },
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: "0.85rem", md: "1rem" },
    },
  };

  const getWarehouseData = (name: string) => {
    return warehouses.find((w) => w.name === name) || warehouses[0];
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          minWidth: 0,
          boxSizing: "border-box",
          pb: 6,
        }}
      >
        {/* Başlık Alanı */}
        <Box sx={{ mb: { xs: 2, md: 4 } }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#111827",
              mb: 0.5,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Stok Operasyonları
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              fontSize: { xs: "0.75rem", md: "0.875rem" },
            }}
          >
            Ürün kabul, çıkış ve depolar arası transfer işlemlerini
            gerçekleştirin
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* SOL KOLON: Form Alanı */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                width: "100%",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  bgcolor: "#FAFAFA",
                  px: { xs: 0, sm: 2 },
                  pt: 1,
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    "& .MuiTabs-scroller": { flexGrow: 0 },
                    "& .MuiTabs-flexContainer": { justifyContent: "center" },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#172C4A",
                      height: 3,
                    },
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                      py: { xs: 1.5, md: 2.5 },
                      px: { xs: 1.5, md: 3 },
                      minWidth: 0,
                      whiteSpace: "nowrap",
                    },
                    "& .Mui-selected": { color: "#172C4A !important" },
                  }}
                >
                  <Tab
                    icon={
                      <ArrowDownwardIcon
                        sx={{ mb: 0.5, fontSize: { xs: 18, md: 20 } }}
                      />
                    }
                    iconPosition="start"
                    label="Ürün Girişi"
                  />
                  <Tab
                    icon={
                      <ArrowUpwardIcon
                        sx={{ mb: 0.5, fontSize: { xs: 18, md: 20 } }}
                      />
                    }
                    iconPosition="start"
                    label="Ürün Çıkışı"
                  />
                  <Tab
                    icon={
                      <SyncAltIcon
                        sx={{ mb: 0.5, fontSize: { xs: 18, md: 20 } }}
                      />
                    }
                    iconPosition="start"
                    label="Transfer"
                  />
                </Tabs>
              </Box>

              <Box sx={{ px: { xs: 1.5, md: 4 } }}>
                {/* 1. INBOUND (Ürün Girişi) Bileşeni */}
                <CustomTabPanel value={tabValue} index={0}>
                  <InboundTab
                    targetWarehouse={targetWarehouse}
                    setTargetWarehouse={setTargetWarehouse}
                    products={products}
                    warehouses={warehouses}
                    zones={zones}
                    shelves={shelves}
                    inputStyle={inputStyle}
                  />
                </CustomTabPanel>

                {/* 2. OUTBOUND (Ürün Çıkışı) Bileşeni */}
                <CustomTabPanel value={tabValue} index={1}>
                  <OutboundTab
                    sourceWarehouse={sourceWarehouse}
                    setSourceWarehouse={setSourceWarehouse}
                    products={products}
                    warehouses={warehouses}
                    inputStyle={inputStyle}
                  />
                </CustomTabPanel>

                {/* 3. TRANSFER Bileşeni */}
                <CustomTabPanel value={tabValue} index={2}>
                  <TransferTab
                    sourceWarehouse={sourceWarehouse}
                    setSourceWarehouse={setSourceWarehouse}
                    targetWarehouse={targetWarehouse}
                    setTargetWarehouse={setTargetWarehouse}
                    products={products}
                    warehouses={warehouses}
                    zones={zones}
                    shelves={shelves}
                    inputStyle={inputStyle}
                  />
                </CustomTabPanel>
              </Box>
            </Card>
          </Grid>

          {/* SAĞ KOLON: Dinamik Yan Panel & Harita Bileşeni */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <SummaryPanel
              tabValue={tabValue}
              sourceWarehouse={sourceWarehouse}
              targetWarehouse={targetWarehouse}
              getWarehouseData={getWarehouseData}
            />
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
