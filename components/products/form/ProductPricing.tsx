"use client";

import { Grid, TextField, Divider, Typography } from "@mui/material";

interface ProductPricingProps {
  formData: {
    costPrice: string;
    unitPrice: string;
    criticalLevel: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: object;
}

export default function ProductPricing({ formData, handleChange, inputStyle }: ProductPricingProps) {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }} />
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}>
          Fiyatlandırma & Stok Seviyesi
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth size="small" type="number" label="Maliyet (₺)" name="costPrice" value={formData.costPrice} onChange={handleChange} sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth size="small" type="number" label="Satış Fiyatı (₺)" name="unitPrice" value={formData.unitPrice} onChange={handleChange} sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField required fullWidth size="small" type="number" label="Kritik Seviye" name="criticalLevel" value={formData.criticalLevel} onChange={handleChange} sx={inputStyle} />
      </Grid>
    </>
  );
}