"use client";

import { Typography, TextField, MenuItem, InputAdornment, Divider, Button, Grid } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { SxProps, Theme } from "@mui/material/styles";

interface InboundTabProps {
  targetWarehouse: string;
  setTargetWarehouse: (val: string) => void;
  products: string[];
  warehouses: {
    name: string;
    capacity: number;
    color: string;
  }[];
  zones: string[];
  shelves: string[];
  inputStyle: SxProps<Theme>;
}

export default function InboundTab({ targetWarehouse, setTargetWarehouse, products, warehouses, zones, shelves, inputStyle }: InboundTabProps) {
  return (
    <Grid container spacing={{ xs: 1.5, md: 3 }}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle2" sx={{ color: "#172C4A", fontWeight: 700, mb: { xs: 0, md: 1 }, display: "flex", alignItems: "center", gap: 1, fontSize: { xs: "0.8rem", md: "0.875rem" } }}>
          <CheckCircleOutlineOutlinedIcon fontSize="small" /> Ürün ve Parti Bilgileri
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField select fullWidth label="Ürün Seçin" defaultValue="" sx={inputStyle}>
          {products.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField fullWidth label="Seri / Lot Numarası" placeholder="Örn: LOT-2024-08A" sx={inputStyle} slotProps={{ input: { endAdornment: (<InputAdornment position="end"><QrCodeScannerIcon sx={{ color: "#9CA3AF", cursor: "pointer", fontSize: { xs: 20, md: 24 } }} /></InputAdornment>) } }} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle2" sx={{ color: "#172C4A", fontWeight: 700, mb: { xs: 0, md: 1 }, mt: 1, fontSize: { xs: "0.8rem", md: "0.875rem" } }}>Hedef Konum ve Miktar</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField select fullWidth label="Hedef Depo" value={targetWarehouse} onChange={(e) => setTargetWarehouse(e.target.value)} sx={inputStyle}>
          {warehouses.map((option) => (<MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField select fullWidth label="Bölge (Zone)" defaultValue="" sx={inputStyle}>
          {zones.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField select fullWidth label="Raf (Shelf)" defaultValue="" sx={inputStyle}>
          {shelves.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField fullWidth label="Giriş Miktarı" type="number" defaultValue="1" sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ mt: { xs: 1, md: 2 } }}>
        <Button variant="contained" fullWidth sx={{ bgcolor: "#059669", "&:hover": { bgcolor: "#047857" }, py: { xs: 1.2, md: 1.5 }, fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 600, borderRadius: 2 }}>
          Ürün Girişini Onayla
        </Button>
      </Grid>
    </Grid>
  );
}
