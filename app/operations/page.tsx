"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
  Divider,
} from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { red } from "@mui/material/colors";

const products = [
  "MacBook Pro M3",
  "Dell UltraSharp Monitör",
  "Ergonomik Ofis Koltuğu",
  "Type-C Çoklayıcı Hub",
];
const warehouses = ["Merkez Depo", "Teknokent Şube", "Ankara Transfer Merkezi"];
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    // Mobilde input içi yazıları da biraz küçültüyoruz
    "& .MuiInputBase-input": {
      fontSize: { xs: "0.85rem", md: "1rem" },
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: "0.85rem", md: "1rem" },
    },
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1000px",
          width: "100%",
          margin: "0 auto",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
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
                // 1. SİHİR: Ana Tabs kök bileşenini flex yapıp ortalıyoruz
                display: "flex",
                justifyContent: "center",

                // 2. SİHİR: Scroller'ın tüm genişliği kaplamasını engelliyoruz (Genişliği sekmeler kadar olacak)
                "& .MuiTabs-scroller": {
                  flexGrow: 0,
                },

                // 3. SİHİR: İç konteynerin elemanları ortalamasını garanti ediyoruz
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                },
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
                  <SyncAltIcon sx={{ mb: 0.5, fontSize: { xs: 18, md: 20 } }} />
                }
                iconPosition="start"
                label="Transfer"
              />
            </Tabs>
          </Box>

          {/* DİYET: Mobilde ekran kenarı boşlukları (px) daraltıldı */}
          <Box sx={{ px: { xs: 1.5, md: 4 } }}>
            {/* 1. INBOUND */}
            <CustomTabPanel value={tabValue} index={0}>
              {/* DİYET: Form elemanları arasındaki boşluk (spacing) mobilde azaltıldı */}
              <Grid container spacing={{ xs: 1.5, md: 3 }}>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#172C4A",
                      fontWeight: 700,
                      mb: { xs: 0, md: 1 },
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon fontSize="small" /> Ürün ve
                    Parti Bilgileri
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Ürün Seçin"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {products.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Seri / Lot Numarası"
                    placeholder="Örn: LOT-2024-08A"
                    sx={inputStyle}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <QrCodeScannerIcon
                              sx={{
                                color: "#9CA3AF",
                                cursor: "pointer",
                                fontSize: { xs: 20, md: 24 },
                              }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#172C4A",
                      fontWeight: 700,
                      mb: { xs: 0, md: 1 },
                      mt: 1,
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                    }}
                  >
                    Hedef Konum ve Miktar
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Hedef Depo"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {warehouses.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Bölge (Zone)"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {zones.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Raf (Shelf)"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {shelves.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Giriş Miktarı"
                    type="number"
                    defaultValue="1"
                    sx={inputStyle}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ mt: { xs: 1, md: 2 } }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#059669",
                      "&:hover": { bgcolor: "#047857" },
                      py: { xs: 1.2, md: 1.5 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Ürün Girişini Onayla
                  </Button>
                </Grid>
              </Grid>
            </CustomTabPanel>

            {/* 2. OUTBOUND */}
            <CustomTabPanel value={tabValue} index={1}>
              <Grid container spacing={{ xs: 1.5, md: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField
                    select
                    fullWidth
                    label="Çıkış Yapılacak Ürün"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {products.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Çıkış Miktarı"
                    type="number"
                    defaultValue="1"
                    sx={inputStyle}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Çıkış Yapılacak Depo"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {warehouses.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Çıkış Nedeni / Müşteri Kodu"
                    placeholder="Örn: Sipariş #10452"
                    sx={inputStyle}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ mt: { xs: 1, md: 2 } }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#DC2626",
                      "&:hover": { bgcolor: "#B91C1C" },
                      py: { xs: 1.2, md: 1.5 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Çıkış İşlemini Tamamla
                  </Button>
                </Grid>
              </Grid>
            </CustomTabPanel>

            {/* 3. TRANSFER */}
            <CustomTabPanel value={tabValue} index={2}>
              <Grid container spacing={{ xs: 1.5, md: 3 }}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    select
                    fullWidth
                    label="Transfer Edilecek Ürün"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {products.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6B7280",
                      mb: 1,
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    ÇIKIŞ YAPILACAK KAYNAK
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    label="Kaynak Depo"
                    defaultValue=""
                    sx={{ ...inputStyle, mb: { xs: 1.5, md: 2 } }}
                  >
                    {warehouses.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Kaynak Bölge/Raf"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {shelves.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid
                  size={{ xs: 12, md: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: { xs: 0.5, md: 0 },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#F3F4F6",
                      p: 1.5,
                      borderRadius: "50%",
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    <SyncAltIcon sx={{ color: "#9CA3AF" }} />
                  </Box>
                  <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <ArrowDownwardIcon sx={{ color: "#9CA3AF" }} />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6B7280",
                      mb: 1,
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    GİRİŞ YAPILACAK HEDEF
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    label="Hedef Depo"
                    defaultValue=""
                    sx={{ ...inputStyle, mb: { xs: 1.5, md: 2 } }}
                  >
                    {warehouses.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Hedef Bölge/Raf"
                    defaultValue=""
                    sx={inputStyle}
                  >
                    {shelves.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 0.5 }} />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Transfer Miktarı"
                    type="number"
                    defaultValue="1"
                    sx={inputStyle}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ mt: { xs: 1, md: 2 } }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#172C4A",
                      "&:hover": { bgcolor: "#0F1D33" },
                      py: { xs: 1.2, md: 1.5 },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Transferi Başlat
                  </Button>
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Box>
        </Card>
      </Box>
    </LayoutWrapper>
  );
}
