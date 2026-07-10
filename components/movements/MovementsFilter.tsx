import { Card, Grid, TextField, MenuItem } from "@mui/material";

interface FilterProps {
  filterType: string;
  setFilterType: (value: string) => void;
}

export default function MovementsFilter({
  filterType,
  setFilterType,
}: FilterProps) {
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

  return (
    <Card
      elevation={0}
      sx={{ p: 2.5, borderRadius: 3, border: "1px solid #E5E7EB", mb: 4 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ürün adı, SKU veya lokasyon ara..."
            sx={inputStyle}
          />
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
  );
}
