"use client";

import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { SupplierDto } from "@/types/definitions/supplier";
import { MovementType } from "@/types/documents/inbound";

interface InboundOrderHeaderFormProps {
  warehouseId: string;
  setWarehouseId: (val: string) => void;
  supplierId: string;
  setSupplierId: (val: string) => void;
  movementType: number;
  setMovementType: (val: number) => void;
  description: string;
  setDescription: (val: string) => void;
  warehouses: WarehouseDto[];
  suppliers: SupplierDto[];
}

export default function InboundOrderHeaderForm({
  warehouseId,
  setWarehouseId,
  supplierId,
  setSupplierId,
  movementType,
  setMovementType,
  description,
  setDescription,
  warehouses,
  suppliers,
}: InboundOrderHeaderFormProps) {
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "2px" },
      "&.Mui-disabled": { bgcolor: "#F3F4F6", color: "#9CA3AF" },
    },
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    "& label.Mui-focused": { color: "#172C4A" },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#172C4A",
    },
  };

  const handleMovementTypeChange = (value: number) => {
    setMovementType(value);
    // İŞ KURALI: Tedarikçi alımı değilse tedarikçi alanı boşaltılır ve kilitlenir.
    if (value !== MovementType.Inbound) {
      setSupplierId("");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 4,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            bgcolor: "#F3F4F6",
            p: 1,
            borderRadius: 2,
            color: "#172C4A",
            display: "flex",
          }}
        >
          <NoteAddOutlinedIcon />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
          Fiş Başlık Bilgileri
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            required
            fullWidth
            size="small"
            label="Hedef Depo"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
            sx={inputStyle}
          >
            {warehouses.map((w) => (
              <MenuItem key={w.id} value={w.id}>
                {w.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Tedarikçi (Opsiyonel)"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            disabled={movementType !== MovementType.Inbound} // AKILLI KİLİT
            helperText={
              movementType !== MovementType.Inbound
                ? "Bu işlem türünde tedarikçi seçilemez."
                : ""
            }
            sx={inputStyle}
          >
            <MenuItem value="">
              <em style={{ color: "#9CA3AF" }}>Tedarikçi Yok</em>
            </MenuItem>
            {suppliers.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.companyName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            required
            fullWidth
            size="small"
            label="İşlem Türü"
            value={movementType}
            onChange={(e) => handleMovementTypeChange(Number(e.target.value))}
            sx={inputStyle}
          >
            <MenuItem value={MovementType.Inbound}>
              Mal Kabul (Tedarikçiden)
            </MenuItem>
            <MenuItem value={MovementType.CustomerReturn}>
              Müşteri İadesi
            </MenuItem>
            <MenuItem value={MovementType.TransferIn}>
              Depo Transferi (Giriş)
            </MenuItem>
            <MenuItem value={MovementType.AdjustmentIn}>
              Sayım Düzeltmesi (Giriş)
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            size="small"
            label="Açıklama / Notlar"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="İrsaliye no, kargo takip no veya iade sebebi vb. notlar..."
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
