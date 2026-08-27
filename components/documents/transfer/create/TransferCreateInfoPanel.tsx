import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  SxProps,
  Theme,
} from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { WarehouseDto } from "@/types/definitions/warehouse";

interface Props {
  warehouses: WarehouseDto[];
  sourceWarehouseId: string;
  setSourceWarehouseId: (id: string) => void;
  targetWarehouseId: string;
  setTargetWarehouseId: (id: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  inputStyle: SxProps<Theme>;
}

export default function TransferCreateInfoPanel({
  warehouses,
  sourceWarehouseId,
  setSourceWarehouseId,
  targetWarehouseId,
  setTargetWarehouseId,
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
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            required
            fullWidth
            size="small"
            label="Kaynak Depo (Çıkış)"
            value={sourceWarehouseId}
            onChange={(e) => setSourceWarehouseId(e.target.value)}
            sx={inputStyle}
          >
            {warehouses.map((w) => (
              <MenuItem key={w.id} value={w.id}>
                {w.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            required
            fullWidth
            size="small"
            label="Hedef Depo (Giriş)"
            value={targetWarehouseId}
            onChange={(e) => setTargetWarehouseId(e.target.value)}
            disabled={!sourceWarehouseId}
            sx={inputStyle}
          >
            {warehouses
              .filter((w) => w.id !== sourceWarehouseId)
              .map((w) => (
                <MenuItem key={w.id} value={w.id}>
                  {w.name}
                </MenuItem>
              ))}
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
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
