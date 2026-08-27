// components/products/ProductsFilterBar.tsx
import { Card, TextField, InputAdornment, MenuItem } from "@mui/material";
import { Grid } from "@mui/material"; // DÜZELTİLDİ
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CategoryDto } from "@/types/definitions/category";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { SupplierDto } from "@/types/definitions/supplier";

interface ProductsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedWarehouse: string;
  setSelectedWarehouse: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedSupplier: string;
  setSelectedSupplier: (val: string) => void;
  categories: CategoryDto[];
  warehouses: WarehouseDto[];
  suppliers: SupplierDto[];
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
  selectedSupplier,
  setSelectedSupplier,
  categories,
  warehouses,
  suppliers,
}: ProductsFilterBarProps) {
  const primaryColor = "#172C4A";
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: primaryColor },
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": { fontSize: { xs: "0.85rem", md: "0.95rem" } },
    "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
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
        <Grid size={{ xs: 12, md: 2.4 }}>
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
        <Grid size={{ xs: 6, md: 2.4 }}>
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
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
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
            {warehouses.map((wh) => (
              <MenuItem key={wh.id} value={wh.name}>
                {wh.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Tedarikçi"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Tedarikçiler</MenuItem>
            {suppliers.map((sup) => (
              <MenuItem key={sup.id} value={sup.id}>
                {sup.companyName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 2.4 }}>
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
