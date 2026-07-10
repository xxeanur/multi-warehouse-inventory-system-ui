import { Card, Grid, TextField, InputAdornment, MenuItem } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface ProductsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedWarehouse: string;
  setSelectedWarehouse: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
}

export default function ProductsFilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedWarehouse,
  setSelectedWarehouse,
  selectedStatus,
  setSelectedStatus,
}: ProductsFilterBarProps) {
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": { fontSize: { xs: "0.85rem", md: "0.95rem" } },
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        mb: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ürün veya SKU ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={inputStyle}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon
                      sx={{ color: "#9CA3AF", fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Kategori"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Kategoriler</MenuItem>
            <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Mobilya">Mobilya</MenuItem>
            <MenuItem value="Aksesuar">Aksesuar</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Depo"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Depolar</MenuItem>
            <MenuItem value="Merkez Depo">Merkez Depo</MenuItem>
            <MenuItem value="Konya Şube">Konya Şube</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Stok Durumu"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Durumlar</MenuItem>
            <MenuItem value="Yeterli">Stok Yeterli</MenuItem>
            <MenuItem value="Kritik">Kritik Seviye</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
