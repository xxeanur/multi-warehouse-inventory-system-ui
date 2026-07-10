import { Box, Card, Typography, Stack, Divider } from "@mui/material";
import MovementTypeChip from "./MovementTypeChip";

// 1. ADIM: "any" yerine verimizin tam yapısını tanımlıyoruz
interface MovementData {
  id: number;
  type: string;
  product: string;
  sku: string;
  qty: string;
  location: string;
  time: string;
  operator: string;
}

// 2. ADIM: Props'a any[] yerine MovementData[] veriyoruz
interface MovementsMobileListProps {
  movements: MovementData[];
}

export default function MovementsMobileList({
  movements,
}: MovementsMobileListProps) {
  return (
    <Stack spacing={2}>
      {movements.map((row) => (
        <Card
          key={row.id}
          elevation={0}
          sx={{ p: 2, borderRadius: 3, border: "1px solid #E5E7EB" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#111827",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.product}
              </Typography>
              <Typography
                sx={{ color: "#6B7280", fontSize: "0.75rem", mt: 0.2 }}
              >
                {row.sku}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                color: row.type === "ÇIKIŞ" ? "#DC2626" : "#111827",
                fontSize: "0.9rem",
                ml: 1,
                flexShrink: 0,
              }}
            >
              {row.qty}
            </Typography>
          </Box>

          <Divider sx={{ my: 1, borderStyle: "dashed" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography
              sx={{ fontSize: "0.75rem", color: "#4B5563", fontWeight: 500 }}
            >
              {row.location}
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
              {row.time}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1.5,
            }}
          >
            <MovementTypeChip type={row.type} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "#6B7280",
                bgcolor: "#F3F4F6",
                px: 1,
                py: 0.3,
                borderRadius: 1,
              }}
            >
              {row.operator}
            </Typography>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}
