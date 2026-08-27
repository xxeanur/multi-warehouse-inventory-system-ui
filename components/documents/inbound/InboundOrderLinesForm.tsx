"use client";

import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ProductDto } from "@/types/definitions/product";

export interface LineItemState {
  id: string;
  productId: string;
  expectedQuantity: number | string;
}

interface InboundOrderLinesFormProps {
  lines: LineItemState[];
  setLines: (lines: LineItemState[]) => void;
  products: ProductDto[];
}

export default function InboundOrderLinesForm({
  lines,
  setLines,
  products,
}: InboundOrderLinesFormProps) {
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "2px" },
    },
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    "& label.Mui-focused": { color: "#172C4A" },
    "& .MuiFormLabel-root.Mui-focused": { color: "#172C4A" },
  };

  const handleAddLine = () => {
    setLines([
      ...lines,
      { id: crypto.randomUUID(), productId: "", expectedQuantity: 1 },
    ]);
  };

  const handleRemoveLine = (idToRemove: string) => {
    if (lines.length === 1) return;
    setLines(lines.filter((line) => line.id !== idToRemove));
  };

  const handleLineChange = (
    id: string,
    field: keyof LineItemState,
    value: string | number,
  ) => {
    setLines(
      lines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line,
      ),
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, border: "1px solid #E5E7EB" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: "#F3F4F6",
              p: 1,
              borderRadius: 2,
              color: "#172C4A",
              display: "flex",
            }}
          >
            <Inventory2OutlinedIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
            Kabul Edilecek Ürünler
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddLine}
          sx={{
            display: { xs: "none", sm: "flex" },
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            color: "#172C4A",
            borderColor: "#E5E7EB",
            "&:hover": { borderColor: "#172C4A", bgcolor: "#F9FAFB" },
          }}
        >
          Yeni Satır
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {lines.map((line, index) => (
          <Box
            key={line.id}
            sx={{
              display: "flex",
              alignItems: { xs: "flex-end", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              p: 2,
              bgcolor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "#172C4A",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: 700,
                color: "#6B7280",
                minWidth: "24px",
              }}
            >
              {index + 1}.
            </Typography>
            <Grid container spacing={2} sx={{ flex: 1, width: "100%" }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  select
                  required
                  fullWidth
                  size="small"
                  label="Ürün"
                  value={line.productId}
                  onChange={(e) =>
                    handleLineChange(line.id, "productId", e.target.value)
                  }
                  sx={inputStyle}
                >
                  {products.map((p) => {
                    // AKILLI KONTROL: Bu ürün başka bir satırda seçilmiş mi?
                    const isSelectedElsewhere = lines.some(
                      (l) => l.id !== line.id && l.productId === p.id,
                    );

                    return (
                      <MenuItem
                        key={p.id}
                        value={p.id}
                        disabled={isSelectedElsewhere}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <span>
                            {p.name} {isSelectedElsewhere ? "(Seçildi)" : ""}
                          </span>
                          <span
                            style={{ color: "#9CA3AF", fontSize: "0.85em" }}
                          >
                            {p.sku}
                          </span>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  required
                  label="Miktar"
                  value={line.expectedQuantity}
                  slotProps={{ htmlInput: { min: 1 } }}
                  onChange={(e) =>
                    handleLineChange(
                      line.id,
                      "expectedQuantity",
                      e.target.value,
                    )
                  }
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
            <IconButton
              onClick={() => handleRemoveLine(line.id)}
              disabled={lines.length === 1}
              sx={{
                alignSelf: { xs: "flex-end", sm: "center" },
                color: lines.length === 1 ? "#D1D5DB" : "#9CA3AF",
                bgcolor: "#F9FAFB",
                borderRadius: 2,
                "&:hover": {
                  color: lines.length === 1 ? "#D1D5DB" : "#DC2626",
                  bgcolor: "#FEF2F2",
                },
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleAddLine}
        fullWidth
        sx={{
          display: { xs: "flex", sm: "none" },
          mt: 2,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          color: "#172C4A",
          borderColor: "#E5E7EB",
        }}
      >
        Yeni Satır Ekle
      </Button>
    </Paper>
  );
}
