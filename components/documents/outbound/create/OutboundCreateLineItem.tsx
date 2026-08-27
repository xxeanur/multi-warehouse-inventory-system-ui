import {
  Box,
  Typography,
  Grid,
  TextField,
  IconButton,
  Autocomplete,
  SxProps,
  Theme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ProductDto } from "@/types/definitions/product";

interface LineItemState {
  id: string;
  productId: string;
  requestedQuantity: number | string;
}

interface Props {
  line: LineItemState;
  index: number;
  availableProductOptions: ProductDto[];
  availableStocks: Record<string, number>;
  canRemove: boolean;
  inputStyle: SxProps<Theme>;
  onChange: (
    id: string,
    field: keyof LineItemState,
    value: string | number,
  ) => void;
  onRemove: (id: string) => void;
}

export default function OutboundCreateLineItem({
  line,
  index,
  availableProductOptions,
  availableStocks,
  canRemove,
  inputStyle,
  onChange,
  onRemove,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-end", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        p: 2,
        bgcolor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 2,
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
          <Autocomplete
            options={availableProductOptions}
            getOptionLabel={(option) => `${option.name} (${option.sku})`}
            value={
              availableProductOptions.find((o) => o.id === line.productId) ||
              null
            }
            onChange={(e, newValue) =>
              onChange(line.id, "productId", newValue ? newValue.id : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Çıkarılacak Ürün Ara..."
                size="small"
                sx={inputStyle}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="body2">{option.name}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#059669", fontWeight: 700 }}
                  >
                    Boşta: {availableStocks[option.id]}
                  </Typography>
                </Box>
              </li>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            size="small"
            type="number"
            required
            label="Çıkış Miktarı"
            value={line.requestedQuantity}
            slotProps={{
              htmlInput: {
                min: 1,
                max: availableStocks[line.productId] || 1,
              },
            }}
            onChange={(e) =>
              onChange(line.id, "requestedQuantity", e.target.value)
            }
            sx={inputStyle}
          />
        </Grid>
      </Grid>
      <IconButton
        onClick={() => onRemove(line.id)}
        disabled={!canRemove}
        sx={{
          alignSelf: { xs: "flex-end", sm: "center" },
          color: !canRemove ? "#D1D5DB" : "#9CA3AF",
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}
