import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { PutawayDetailLineDto } from "@/types/inventory/putaway";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";
import { ShelfDto } from "@/types/definitions/shelf";
import { shelfService } from "@/services/definitions/shelfService";

export interface SplitPlacement {
  id: string;
  zoneId: string;
  shelfId: string;
  quantity: number;
}

interface Props {
  line: PutawayDetailLineDto;
  zones: WarehouseZoneDto[];
  onPlacementChange: (lineId: string, placements: SplitPlacement[]) => void;
}

export default function PutawayLineItem({
  line,
  zones,
  onPlacementChange,
}: Props) {
  const targetQuantity = line.quantityToPlace;

  const [splits, setSplits] = useState<SplitPlacement[]>([
    {
      id: crypto.randomUUID(),
      zoneId: "",
      shelfId: "",
      quantity: targetQuantity,
    },
  ]);

  const [shelvesByZone, setShelvesByZone] = useState<
    Record<string, ShelfDto[]>
  >({});

  useEffect(() => {
    onPlacementChange(line.documentLineId, splits);
  }, [splits, line.documentLineId, onPlacementChange]);

  const loadShelvesForZone = async (zoneId: string) => {
    if (!zoneId || shelvesByZone[zoneId]) return;
    const shelves = await shelfService.getByZoneIdAsync(zoneId);
    setShelvesByZone((prev) => ({ ...prev, [zoneId]: shelves }));
  };

  const updateSplit = (
    id: string,
    field: keyof SplitPlacement,
    value: string | number,
  ) => {
    if (field === "zoneId") loadShelvesForZone(value as string);

    setSplits(
      splits.map((s) => {
        if (s.id === id) {
          const updated = { ...s, [field]: value };
          if (field === "zoneId") updated.shelfId = "";
          return updated;
        }
        return s;
      }),
    );
  };

  const addSplit = () => {
    const currentTotal = splits.reduce(
      (sum, s) => sum + Number(s.quantity || 0),
      0,
    );
    const remaining = Math.max(0, targetQuantity - currentTotal);
    setSplits([
      ...splits,
      { id: crypto.randomUUID(), zoneId: "", shelfId: "", quantity: remaining },
    ]);
  };

  const removeSplit = (id: string) => {
    if (splits.length === 1) return;
    setSplits(splits.filter((s) => s.id !== id));
  };

  const currentTotal = splits.reduce(
    (sum, s) => sum + Number(s.quantity || 0),
    0,
  );
  const diff = targetQuantity - currentTotal;

  const inputStyle = {
    "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#F9FAFB" },
    "& .MuiInputBase-input": { fontSize: "0.9rem" },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
  };

  return (
    <Box
      sx={{
        p: 2,
        mb: 3,
        border: "1px solid",
        borderColor: diff === 0 ? "#10B981" : "#E5E7EB",
        borderRadius: 2,
        bgcolor: "#FFFFFF",
        transition: "0.3s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#111827" }}
        >
          {line.productName}{" "}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: "#6B7280" }}
          >
            ({line.productCode})
          </Typography>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            label={`Dizilecek: ${targetQuantity} | Yerleşen: ${currentTotal}`}
            size="small"
            sx={{
              fontWeight: 700,
              bgcolor: diff === 0 ? "#D1FAE5" : "#FEF2F2",
              color: diff === 0 ? "#059669" : "#DC2626",
            }}
          />
          <Tooltip title="Ürünü farklı raflara böl">
            <Button
              size="small"
              variant="outlined"
              startIcon={<CallSplitIcon />}
              onClick={addSplit}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                color: "#172C4A",
                borderColor: "#E5E7EB",
              }}
            >
              Böl
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {splits.map((split) => (
        <Box
          key={split.id}
          sx={{ display: "flex", gap: 2, mb: 1, alignItems: "center" }}
        >
          <Grid container spacing={2} sx={{ flex: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Alan (Zone)"
                value={split.zoneId}
                onChange={(e) =>
                  updateSplit(split.id, "zoneId", e.target.value)
                }
                sx={inputStyle}
              >
                {zones.map((z) => (
                  <MenuItem key={z.id} value={z.id}>
                    {z.zoneName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Raf Seçiniz"
                value={split.shelfId}
                onChange={(e) =>
                  updateSplit(split.id, "shelfId", e.target.value)
                }
                disabled={!split.zoneId}
                sx={inputStyle}
              >
                {!split.zoneId ? (
                  <MenuItem disabled value="">
                    Önce Alan Seçin
                  </MenuItem>
                ) : (shelvesByZone[split.zoneId] || []).length === 0 ? (
                  <MenuItem disabled value="">
                    Raf Yok
                  </MenuItem>
                ) : (
                  (shelvesByZone[split.zoneId] || []).map((s) => {
                    const isAlreadySelected = splits.some(
                      (otherSplit) =>
                        otherSplit.id !== split.id &&
                        otherSplit.shelfId === s.id,
                    );

                    return (
                      <MenuItem
                        key={s.id}
                        value={s.id}
                        disabled={isAlreadySelected}
                      >
                        {s.shelfNumber}{" "}
                        {isAlreadySelected ? "(Zaten Seçildi)" : ""}
                      </MenuItem>
                    );
                  })
                )}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Miktar"
                value={split.quantity}
                onChange={(e) =>
                  updateSplit(split.id, "quantity", Number(e.target.value))
                }
                slotProps={{ htmlInput: { min: 1, max: targetQuantity } }}
                sx={inputStyle}
              />
            </Grid>
          </Grid>
          <IconButton
            onClick={() => removeSplit(split.id)}
            disabled={splits.length === 1}
            sx={{ color: splits.length === 1 ? "#D1D5DB" : "#DC2626" }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
