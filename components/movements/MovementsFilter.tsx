"use client";

import { Card, Grid, TextField, MenuItem } from "@mui/material";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { UserRole } from "@/types/identity/user";

interface FilterProps {
  userRole: UserRole | null;
  warehouses: WarehouseDto[];
  filterWarehouse: string;
  setFilterWarehouse: (value: string) => void;
  filterDirection: string;
  setFilterDirection: (value: string) => void;
  filterType: number | "ALL";
  setFilterType: (value: number | "ALL") => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function MovementsFilter({
  userRole,
  warehouses,
  filterWarehouse,
  setFilterWarehouse,
  filterDirection,
  setFilterDirection,
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
}: FilterProps) {
  const primaryColor = "#172C4A";
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: primaryColor },
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
  };

  const isSuperAdmin = userRole === UserRole.SuperAdmin;

  return (
    <Card
      elevation={0}
      sx={{ p: 2.5, borderRadius: 3, border: "1px solid #E5E7EB", mb: 4 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: isSuperAdmin ? 3 : 6 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Barkod, Fiş No Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={inputStyle}
          />
        </Grid>

        {isSuperAdmin && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Depo Seçimi"
              value={filterWarehouse}
              onChange={(e) => setFilterWarehouse(e.target.value)}
              sx={inputStyle}
            >
              <MenuItem value="ALL">Tüm Depolar</MenuItem>
              {warehouses.map((w) => (
                <MenuItem key={w.id} value={w.id}>
                  {w.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Hareket Yönü"
            value={filterDirection}
            onChange={(e) => setFilterDirection(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Yönler</MenuItem>
            <MenuItem value="GİRİŞ">Sadece Girişler</MenuItem>
            <MenuItem value="ÇIKIŞ">Sadece Çıkışlar</MenuItem>
            <MenuItem value="TRANSFER">Transferler</MenuItem>
            <MenuItem value="DÜZELTME">Düzeltmeler</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="İşlem Tipi"
            value={filterType}
            onChange={(e) => {
              const val = e.target.value;
              setFilterType(val === "ALL" ? "ALL" : Number(val));
            }}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Alt Tipler</MenuItem>
            <MenuItem value={1}>Mal Kabul</MenuItem>
            <MenuItem value={2}>Müşteri İadesi</MenuItem>
            <MenuItem value={3}>Sevkiyat / Satış</MenuItem>
            <MenuItem value={4}>Tedarikçi İadesi</MenuItem>
            <MenuItem value={5}>Fire / Hurda</MenuItem>
            <MenuItem value={6}>Transfer Girişi</MenuItem>
            <MenuItem value={7}>Transfer Çıkışı</MenuItem>
            <MenuItem value={8}>Raf Transferi</MenuItem>
            <MenuItem value={9}>Sayım Düzeltmesi</MenuItem>
            <MenuItem value={10}>Ters Kayıt</MenuItem>
            <MenuItem value={11}>Sayım Eksiği</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
