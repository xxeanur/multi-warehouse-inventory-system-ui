"use client";

import { Typography, TextField, MenuItem, Divider, Button, Grid, Box } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { SxProps, Theme } from "@mui/material/styles";

interface TransferTabProps {
  sourceWarehouse: string;
  setSourceWarehouse: (val: string) => void;
  targetWarehouse: string;
  setTargetWarehouse: (val: string) => void;
  products: string[];
  warehouses: { name: string; capacity: number; color: string }[];
  zones: string[];
  shelves: string[];
  inputStyle: SxProps<Theme>;
}
export default function TransferTab({ sourceWarehouse, setSourceWarehouse, targetWarehouse, setTargetWarehouse, products, warehouses, zones, shelves, inputStyle }: TransferTabProps) {
  return (
    <Grid container spacing={{ xs: 1.5, md: 3 }}>
      <Grid size={{ xs: 12 }}>
        <TextField select fullWidth label="Transfer Edilecek Ürün" defaultValue="" sx={inputStyle}>
          {products.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="caption" sx={{ color: "#6B7280", mb: 1, display: "block", fontWeight: 600 }}>ÇIKIŞ YAPILACAK KAYNAK</Typography>
        <TextField select fullWidth label="Kaynak Depo" value={sourceWarehouse} onChange={(e) => setSourceWarehouse(e.target.value)} sx={{ ...inputStyle, mb: { xs: 1.5, md: 2 } }}>
          {warehouses.map((option) => (<MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>))}
        </TextField>
        <TextField select fullWidth label="Kaynak Bölge/Raf" defaultValue="" sx={inputStyle}>
          {shelves.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 2 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: { xs: 0.5, md: 0 } }}>
        <Box sx={{ bgcolor: "#F3F4F6", p: 1.5, borderRadius: "50%", display: { xs: "none", md: "flex" } }}>
          <SyncAltIcon sx={{ color: "#9CA3AF" }} />
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <ArrowDownwardIcon sx={{ color: "#9CA3AF" }} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="caption" sx={{ color: "#6B7280", mb: 1, display: "block", fontWeight: 600 }}>GİRİŞ YAPILACAK HEDEF</Typography>
        <TextField select fullWidth label="Hedef Depo" value={targetWarehouse} onChange={(e) => setTargetWarehouse(e.target.value)} sx={{ ...inputStyle, mb: { xs: 1.5, md: 2 } }}>
          {warehouses.map((option) => (<MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>))}
        </TextField>
        <TextField select fullWidth label="Hedef Bölge/Raf" defaultValue="" sx={inputStyle}>
          {shelves.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /></Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField fullWidth label="Transfer Miktarı" type="number" defaultValue="1" sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ mt: { xs: 1, md: 2 } }}>
        <Button variant="contained" fullWidth sx={{ bgcolor: "#172C4A", "&:hover": { bgcolor: "#0F1D33" }, py: { xs: 1.2, md: 1.5 }, fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 600, borderRadius: 2 }}>
          Transferi Başlat
        </Button>
      </Grid>
    </Grid>
  );
}