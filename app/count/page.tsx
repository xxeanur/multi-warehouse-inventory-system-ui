"use client";

import { useState } from "react";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";

import LayoutWrapper from "../../components/LayoutWrapper";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import LocalPlayOutlinedIcon from "@mui/icons-material/LocalPlayOutlined";

// Sahte (mock) bekleyen/tamamlanan sayım listesi

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

const products = [
  "MacBook Pro M3",
  "Dell UltraSharp Monitör",
  "Logitech MX Master 3",
];

const shelves = ["A1-01", "A1-02", "B2-05", "C3-10"];

export default function InventoryCountPage() {
  const [barcode, setBarcode] = useState("");

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,

      bgcolor: "#F9FAFB",

      "& fieldset": { borderColor: "#E5E7EB" },

      "&:hover fieldset": { borderColor: "#172C4A" },

      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },

    "& .MuiInputBase-input": { fontSize: { xs: "0.85rem", md: "1rem" } },

    "& .MuiInputLabel-root": { fontSize: { xs: "0.85rem", md: "1rem" } },
  };

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
        {/* Sayfa Başlığı */}

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#111827",
              mb: 0.5,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Depo Sayım Otomasyonu
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#6B7280", fontSize: { xs: "0.8rem", md: "0.9rem" } }}
          >
            Fiziki stok sayımlarını gerçekleştirin ve sistem senkronizasyonunu
            kontrol edin
          </Typography>
        </Box>

        {/* Üst İlerleme ve Özet Alanı */}

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* ÇÖZÜM: height: 100% ve flex yapıları silinip doğal akışa bırakıldı */}

            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E5E7EB",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, color: "#374151" }}
                >
                  Mevcut Sayım Dönemi (Temmuz 2026)
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "#172C4A" }}
                >
                  %68
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={68}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: "#F3F4F6",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#172C4A",
                    borderRadius: 5,
                  },
                }}
              />

              <Typography
                variant="body2"
                sx={{ color: "#6B7280", display: "block", mt: 2 }}
              >
                Toplam 1,248 ürün çeşidinden 848 adedi fiziki olarak doğrulandı.
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            {/* ÇÖZÜM: Yükseklik zorlamaları silindi */}

            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #FECACA",
                bgcolor: "#FEF2F2",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1.5,
                }}
              >
                <WarningAmberIcon sx={{ color: "#DC2626", fontSize: 26 }} />

                <Typography
                  variant="subtitle1"
                  sx={{ color: "#991B1B", fontWeight: 700 }}
                >
                  Bulunan Uyuşmazlık
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{ color: "#991B1B", fontWeight: 800, mb: 1 }}
              >
                3 Farklı Raf
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#DC2626", display: "block" }}
              >
                Sistem verisiyle fiziki sayımın uyuşmadığı noktalar.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* SOL TARAF: Hızlı Sayım Formu */}

          <Grid size={{ xs: 12, lg: 5 }}>
            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#172C4A",
                  fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <LocalPlayOutlinedIcon /> Hızlı Fiziki Sayım Girişi
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Barkod / QR Kod Okut"
                  placeholder="El terminali ile okutun"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  sx={inputStyle}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <QrCodeScannerIcon sx={{ color: "#9CA3AF" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Divider sx={{ my: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9CA3AF",
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    VEYA MANUEL SEÇİN
                  </Typography>
                </Divider>

                <TextField
                  select
                  fullWidth
                  label="Ürün Tanımı"
                  defaultValue=""
                  sx={inputStyle}
                >
                  {products.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Bulunduğu Raf"
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

                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="Sayılan Miktar"
                      type="number"
                      defaultValue=""
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  sx={{
                    bgcolor: "#172C4A",

                    "&:hover": { bgcolor: "#0F1D33" },

                    py: 1.8,

                    fontWeight: 600,

                    fontSize: "1rem",

                    borderRadius: 2,

                    textTransform: "none",

                    mt: 1,
                  }}
                >
                  Sayımı Listeye Ekle
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* SAĞ TARAF: Anlık Sayım Tablosu */}

          <Grid size={{ xs: 12, lg: 7 }}>
            {/* ÇÖZÜM: height: 100% buradan da silindi */}

            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: { xs: 3, md: 4 },
                  py: 3,
                  borderBottom: "1px solid #E5E7EB",
                  bgcolor: "#FAFAFA",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#111827" }}
                >
                  Anlık Sayım Seansı Verileri
                </Typography>
              </Box>

              <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead sx={{ bgcolor: "#FFFFFF" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          py: 2,
                          px: { xs: 2, md: 4 },
                        }}
                      >
                        Raf / Ürün
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{ fontWeight: 600, color: "#6B7280" }}
                      >
                        Sistem
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{ fontWeight: 600, color: "#6B7280" }}
                      >
                        Sayılan
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                          px: { xs: 2, md: 4 },
                        }}
                      >
                        Durum
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {activeCounts.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ py: 2.5, px: { xs: 2, md: 4 } }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                          >
                            {row.name}
                          </Typography>

                          <Typography variant="body2" sx={{ color: "#6B7280" }}>
                            {row.shelf} • {row.sku}
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            color: "#6B7280",
                            fontWeight: 500,
                            fontSize: "1rem",
                          }}
                        >
                          {row.systemQty}
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            color: "#111827",
                            fontSize: "1rem",
                          }}
                        >
                          {row.countedQty}
                        </TableCell>

                        <TableCell align="right" sx={{ px: { xs: 2, md: 4 } }}>
                          <Chip
                            label={row.status}
                            sx={{
                              fontWeight: 600,

                              fontSize: "0.75rem",

                              borderRadius: 1.5,

                              px: 1,

                              bgcolor:
                                row.status === "Eşleşti"
                                  ? "#D1FAE5"
                                  : row.status === "Eksik"
                                    ? "#FEE2E2"
                                    : "#FEF3C7",

                              color:
                                row.status === "Eşleşti"
                                  ? "#065F46"
                                  : row.status === "Eksik"
                                    ? "#991B1B"
                                    : "#92400E",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
