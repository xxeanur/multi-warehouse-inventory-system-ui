import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  SxProps,
  Theme,
} from "@mui/material";
import { WarehouseDto } from "@/types/definitions/warehouse";

interface Props {
  warehouses: WarehouseDto[];
  warehouseId: string;
  setWarehouseId: (id: string) => void;
  destination: string;
  setDestination: (dest: string) => void;
  movementType: number;
  setMovementType: (type: number) => void;
  description: string;
  setDescription: (desc: string) => void;
  inputStyle: SxProps<Theme>;
}

export default function OutboundCreateInfoPanel({
  warehouses,
  warehouseId,
  setWarehouseId,
  destination,
  setDestination,
  movementType,
  setMovementType,
  description,
  setDescription,
  inputStyle,
}: Props) {
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
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            required
            fullWidth
            size="small"
            label="Kaynak Depo"
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
            required
            fullWidth
            size="small"
            label="Hedef (Kime Gidiyor?)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Müşteri Adı, Şube vb."
            sx={inputStyle}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            required
            fullWidth
            size="small"
            label="İşlem Türü"
            value={movementType}
            onChange={(e) => setMovementType(Number(e.target.value))}
            sx={inputStyle}
          >
            <MenuItem value={3}>Mal Çıkış / Sevkiyat</MenuItem>
            <MenuItem value={4}>Tedarikçi İadesi</MenuItem>
            <MenuItem value={5}>Fire / Hurda Çıkışı</MenuItem>
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
            placeholder="Taşıma irsaliyesi, şoför bilgisi vb."
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
