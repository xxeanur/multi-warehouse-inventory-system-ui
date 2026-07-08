"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";
import LayoutWrapper from "../../components/LayoutWrapper";
import { useTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

// İşlem tipleri GİRİŞ ve ÇIKIŞ olarak güncellendi
const mockMovements = [
  { id: 1, type: "GİRİŞ", product: "MacBook Pro M3", sku: "SKU-1001", qty: "+50 Adet", location: "Merkez Depo - Zone A", time: "10 dk önce", operator: "Admin User" },
  { id: 2, type: "TRANSFER", product: "Dell UltraSharp Monitör", sku: "SKU-1002", qty: "15 Adet", location: "Merkez -> Konya Şube", time: "45 dk önce", operator: "Admin User" },
  { id: 3, type: "ÇIKIŞ", product: "Logitech MX Master 3", sku: "SKU-1088", qty: "-2 Adet", location: "Konya Şube - Raf 4", time: "1 saat önce", operator: "Depo Görevlisi" },
  { id: 4, type: "GİRİŞ", product: "Ergonomik Ofis Koltuğu", sku: "SKU-2055", qty: "+20 Adet", location: "Merkez Depo - Zone C", time: "3 saat önce", operator: "Merkez Sorumlusu" },
  { id: 5, type: "TRANSFER", product: "Type-C Çoklayıcı Hub", sku: "SKU-3012", qty: "100 Adet", location: "Konya Şube -> Ankara M.", time: "5 saat önce", operator: "Depo Görevlisi" },
];

export default function MovementsPage() {
  const [filterType, setFilterType] = useState("ALL");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "2px" },
    },
  };

  const renderTypeChip = (type: string) => {
    switch (type) {
      case "GİRİŞ":
        return <Chip label="GİRİŞ" size="small" icon={<ArrowDownwardIcon style={{ fontSize: 14 }} />} sx={{ bgcolor: "#D1FAE5", color: "#065F46", fontWeight: 700, borderRadius: 1.5 }} />;
      case "ÇIKIŞ":
        return <Chip label="ÇIKIŞ" size="small" icon={<ArrowUpwardIcon style={{ fontSize: 14 }} />} sx={{ bgcolor: "#FEE2E2", color: "#991B1B", fontWeight: 700, borderRadius: 1.5 }} />;
      case "TRANSFER":
        return <Chip label="TRANSFER" size="small" icon={<SyncAltIcon style={{ fontSize: 14 }} />} sx={{ bgcolor: "#E0E7FF", color: "#3730A3", fontWeight: 700, borderRadius: 1.5 }} />;
      default:
        return null;
    }
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 3, md: 0 }, pb: 4, overflowX: "hidden" }}>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
            Hareket Geçmişi
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Depo genelindeki tüm stok giriş, çıkış ve transfer loglarını inceleyin.
          </Typography>
        </Box>

        <Card elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #E5E7EB", mb: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField fullWidth size="small" placeholder="Ürün adı, SKU veya lokasyon ara..." sx={inputStyle} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="İşlem Tipi"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                sx={inputStyle}
              >
                <MenuItem value="ALL">Tüm İşlemler</MenuItem>
                <MenuItem value="GİRİŞ">Sadece Girişler (Mal Kabul)</MenuItem>
                <MenuItem value="ÇIKIŞ">Sadece Çıkışlar (Sevkiyat)</MenuItem>
                <MenuItem value="TRANSFER">Sadece Transferler</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Card>

        {isMobile ? (
          <Stack spacing={2}>
            {mockMovements.map((row) => (
              <Card key={row.id} elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #E5E7EB" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {row.product}
                    </Typography>
                    <Typography sx={{ color: "#6B7280", fontSize: "0.75rem", mt: 0.2 }}>
                      {row.sku}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: row.type === "ÇIKIŞ" ? "#DC2626" : "#111827", fontSize: "0.9rem", ml: 1, flexShrink: 0 }}>
                    {row.qty}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1, borderStyle: "dashed" }} />
                
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                  <Typography sx={{ fontSize: "0.75rem", color: "#4B5563", fontWeight: 500 }}>
                    {row.location}
                  </Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
                    {row.time}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                  {renderTypeChip(row.type)}
                  <Typography sx={{ fontSize: "0.7rem", color: "#6B7280", bgcolor: "#F3F4F6", px: 1, py: 0.3, borderRadius: 1 }}>
                    {row.operator}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        ) : (
          <TableContainer component={Card} elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}>
            <Table size="medium">
              <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>İşlem Tipi</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Ürün Bilgisi</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#4B5563" }} align="center">Miktar</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Konum / Raf</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>Zaman</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#4B5563" }} align="right">Operatör</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockMovements.map((row, index) => (
                  <TableRow key={row.id} sx={{ bgcolor: index % 2 === 0 ? "transparent" : "#FDFDFD", "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={{ py: 2 }}>{renderTypeChip(row.type)}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: "#111827", fontSize: "0.9rem" }}>{row.product}</Typography>
                      <Typography sx={{ color: "#6B7280", fontSize: "0.75rem" }}>{row.sku}</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: row.type === "ÇIKIŞ" ? "#DC2626" : "#111827" }}>
                      {row.qty}
                    </TableCell>
                    <TableCell sx={{ color: "#4B5563", fontSize: "0.875rem", fontWeight: 500 }}>{row.location}</TableCell>
                    <TableCell sx={{ color: "#6B7280", fontSize: "0.85rem" }}>{row.time}</TableCell>
                    <TableCell align="right" sx={{ color: "#374151", fontWeight: 500, fontSize: "0.85rem" }}>{row.operator}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </LayoutWrapper>
  );
}