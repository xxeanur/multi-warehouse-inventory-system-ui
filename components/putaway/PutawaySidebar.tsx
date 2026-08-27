import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { PutawayListDto } from "@/types/inventory/putaway";

interface Props {
  warehouses: WarehouseDto[];
  selectedWarehouseId: string;
  onWarehouseChange: (id: string) => void;
  orders: PutawayListDto[];
  selectedOrderId: string | undefined;
  onOrderSelect: (documentId: string, documentType: string) => void;
}

export default function PutawaySidebar({
  warehouses,
  selectedWarehouseId,
  onWarehouseChange,
  orders,
  selectedOrderId,
  onOrderSelect,
}: Props) {
  const getDocTypeColor = (type: string) => {
    if (type === "Transfer") return { bg: "#FEF3C7", text: "#D97706" };
    return { bg: "#DBEAFE", text: "#1D4ED8" };
  };

  const primaryColor = "#172C4A";

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        height: "100%",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2, bgcolor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "#111827", mb: 1.5 }}
        >
          Yerleştirme Bekleyenler
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          label="İşlem Yapılacak Depo"
          value={selectedWarehouseId}
          onChange={(e) => onWarehouseChange(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#FFFFFF",
              borderRadius: 2,
              transition: "0.3s",
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": {
                borderColor: primaryColor,
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
          }}
        >
          {warehouses.map((w) => (
            <MenuItem key={w.id} value={w.id}>
              {w.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <List sx={{ p: 0 }}>
        {orders.length === 0 && (
          <Typography
            variant="body2"
            sx={{
              p: 4,
              textAlign: "center",
              color: "#9CA3AF",
              fontWeight: 500,
            }}
          >
            Bu depoda rafa dizilecek onaylı iş bulunamadı.
          </Typography>
        )}
        {orders.map((order) => {
          const colors = getDocTypeColor(order.documentType);
          return (
            <div key={order.documentId}>
              <ListItemButton
                selected={selectedOrderId === order.documentId}
                onClick={() =>
                  onOrderSelect(order.documentId, order.documentType)
                }
                sx={{
                  p: 2,
                  "&.Mui-selected": {
                    bgcolor: "#F0F9FF",
                    borderLeft: `4px solid ${primaryColor}`,
                  },
                }}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "#111827" }}
                    >
                      {order.documentNumber}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: "#6B7280",
                          fontWeight: 500,
                        }}
                      >
                        Kaynak: {order.sourceName}
                      </Typography>
                      <Chip
                        label={order.movementTypeName}
                        size="small"
                        sx={{
                          mt: 1,
                          fontSize: "0.7rem",
                          height: 20,
                          bgcolor: colors.bg,
                          color: colors.text,
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                  }
                />
              </ListItemButton>
              <Divider />
            </div>
          );
        })}
      </List>
    </Card>
  );
}
