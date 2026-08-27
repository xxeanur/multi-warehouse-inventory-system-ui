"use client";

import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { CategoryDto } from "@/types/definitions/category";
import { SupplierDto } from "@/types/definitions/supplier";
import { UnitType } from "@/types/definitions/product";

interface ProductBasicInfoProps {
  formData: {
    name: string;
    sku: string;
    barcode: string;
    brand: string;
    categoryId: string;
    supplierId: string;
    unit: UnitType;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryDto[];
  suppliers: SupplierDto[];
  onOpenScanner: () => void;
  inputStyle: object;
}

export default function ProductBasicInfo({
  formData,
  handleChange,
  categories,
  suppliers,
  onOpenScanner,
  inputStyle,
}: ProductBasicInfoProps) {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          size="small"
          label="Ürün Adı"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={inputStyle}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          fullWidth
          size="small"
          label="Stok Kodu (SKU)"
          name="sku"
          placeholder="Örn: SKU-1001"
          value={formData.sku}
          onChange={handleChange}
          sx={inputStyle}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          required
          fullWidth
          size="small"
          label="Barkod"
          name="barcode"
          placeholder="Ürün Barkodunu Okutun"
          value={formData.barcode}
          onChange={handleChange}
          sx={inputStyle}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Kamerayla Okut">
                    <IconButton
                      onClick={onOpenScanner}
                      edge="end"
                      sx={{ color: "#172C4A" }}
                    >
                      <QrCodeScannerIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          size="small"
          label="Marka"
          name="brand"
          placeholder="Örn: Apple"
          value={formData.brand}
          onChange={handleChange}
          sx={inputStyle}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          required
          fullWidth
          size="small"
          label="Kategori"
          name="categoryId"
          value={formData.categoryId || ""}
          onChange={handleChange}
          sx={inputStyle}
        >
          <MenuItem value="" disabled sx={{ display: "none" }}>
            Kategori Seçin
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Tedarikçi (Opsiyonel)"
          name="supplierId"
          value={formData.supplierId || ""}
          onChange={handleChange}
          sx={inputStyle}
        >
          <MenuItem value="" disabled sx={{ display: "none" }}>
            Tedarikçi Seçin
          </MenuItem>
          {suppliers.map((sup) => (
            <MenuItem key={sup.id} value={sup.id}>
              {sup.companyName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          required
          fullWidth
          size="small"
          label="Ölçü Birimi"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          sx={inputStyle}
        >
          <MenuItem value={UnitType.Piece}>Adet (Piece)</MenuItem>
          <MenuItem value={UnitType.Kg}>Kilogram (Kg)</MenuItem>
          <MenuItem value={UnitType.Liter}>Litre (Liter)</MenuItem>
          <MenuItem value={UnitType.Meter}>Metre (Meter)</MenuItem>
          <MenuItem value={UnitType.Box}>Kutu (Box)</MenuItem>
        </TextField>
      </Grid>
    </>
  );
}
