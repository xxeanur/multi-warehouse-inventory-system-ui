"use client";

import { Card, TextField, InputAdornment, MenuItem } from "@mui/material";
import { Grid } from "@mui/material"; // DÜZELTİLDİ: Sizin projeye uygun Grid importu
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { UserRole } from "@/types/identity/user";

interface UsersFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedWarehouse: string;
  setSelectedWarehouse: (val: string) => void;
  selectedRole: string | number;
  setSelectedRole: (val: string | number) => void;
  warehouses: WarehouseDto[];
  isSuperAdmin: boolean;
}

export default function UsersFilterBar({
  searchTerm,
  setSearchTerm,
  selectedWarehouse,
  setSelectedWarehouse,
  selectedRole,
  setSelectedRole,
  warehouses,
  isSuperAdmin,
}: UsersFilterBarProps) {
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
        {/* ARAMA ÇUBUĞU */}
        <Grid size={{ xs: 12, md: isSuperAdmin ? 4 : 6 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="İsim, Soyisim veya E-posta ara..."
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

        {isSuperAdmin && (
          <Grid size={{ xs: 12, md: 4 }}>
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
                <MenuItem key={wh.id} value={wh.id}>
                  {wh.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: isSuperAdmin ? 4 : 6 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Sistem Rolü"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="ALL">Tüm Roller</MenuItem>
            <MenuItem value={UserRole.SuperAdmin}>Süper Admin</MenuItem>
            <MenuItem value={UserRole.WarehouseManager}>
              Depo Sorumlusu
            </MenuItem>
            <MenuItem value={UserRole.Staff}>Saha Personeli</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
