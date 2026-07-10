"use client";

import { TextField, MenuItem, Button, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

interface OutboundTabProps {
  sourceWarehouse: string;
  setSourceWarehouse: (val: string) => void;
  products: string[];
  warehouses: {
    name: string;
    capacity: number;
    color: string;
  }[];
  inputStyle: SxProps<Theme>;
}

export default function OutboundTab({ sourceWarehouse, setSourceWarehouse, products, warehouses, inputStyle }: OutboundTabProps) {
  return (
    <Grid container spacing={{ xs: 1.5, md: 3 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <TextField select fullWidth label="Çıkış Yapılacak Ürün" defaultValue="" sx={inputStyle}>
          {products.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField fullWidth label="Çıkış Miktarı" type="number" defaultValue="1" sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField select fullWidth label="Çıkış Yapılacak Depo" value={sourceWarehouse} onChange={(e) => setSourceWarehouse(e.target.value)} sx={inputStyle}>
          {warehouses.map((option) => (<MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField fullWidth label="Çıkış Nedeni / Müşteri Kodu" placeholder="Örn: Sipariş #10452" sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ mt: { xs: 1, md: 2 } }}>
        <Button variant="contained" fullWidth sx={{ bgcolor: "#DC2626", "&:hover": { bgcolor: "#B91C1C" }, py: { xs: 1.2, md: 1.5 }, fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 600, borderRadius: 2 }}>
          Çıkış İşlemini Tamamla
        </Button>
      </Grid>
    </Grid>
  );
}