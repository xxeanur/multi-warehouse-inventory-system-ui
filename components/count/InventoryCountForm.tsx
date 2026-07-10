import { useState } from "react";
import { Box, Card, Typography, TextField, Button, Grid, MenuItem, InputAdornment, Divider } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LocalPlayOutlinedIcon from "@mui/icons-material/LocalPlayOutlined";

interface FormProps {
  products: string[];
  shelves: string[];
}

export default function InventoryCountForm({ products, shelves }: FormProps) {
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
    <Card elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: "1px solid #E5E7EB", width: "100%", boxSizing: "border-box" }}>
      <Typography variant="subtitle1" sx={{ color: "#172C4A", fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
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
          <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 600, letterSpacing: 0.5 }}>
            VEYA MANUEL SEÇİN
          </Typography>
        </Divider>

        <TextField select fullWidth label="Ürün Tanımı" defaultValue="" sx={inputStyle}>
          {products.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField select fullWidth label="Bulunduğu Raf" defaultValue="" sx={inputStyle}>
              {shelves.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField fullWidth label="Sayılan Miktar" type="number" defaultValue="" sx={inputStyle} />
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
  );
}