"use client";

import { Grid, TextField, Divider, Typography } from "@mui/material";

interface ProductPhysicalProps {
  formData: {
    width: string;
    height: string;
    depth: string;
    weight: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle: object;
}

export default function ProductPhysical({ formData, handleChange, inputStyle }: ProductPhysicalProps) {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 1, borderColor: "#E5E7EB", borderStyle: "dashed" }} />
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}>
          Fiziksel Özellikler
        </Typography>
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField fullWidth size="small" type="number" label="En (cm)" name="width" value={formData.width} onChange={handleChange} sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField fullWidth size="small" type="number" label="Boy (cm)" name="height" value={formData.height} onChange={handleChange} sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField fullWidth size="small" type="number" label="Yük. (cm)" name="depth" value={formData.depth} onChange={handleChange} sx={inputStyle} />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField fullWidth size="small" type="number" label="Ağırlık (kg)" name="weight" placeholder="Örn: 2.5" value={formData.weight} onChange={handleChange} sx={inputStyle} />
      </Grid>
    </>
  );
}