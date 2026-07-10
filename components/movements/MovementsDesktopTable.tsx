import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MovementTypeChip from "./MovementTypeChip";

// 1. ADIM: Veri yapımızı (interface) buraya da tanımlıyoruz
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

// 2. ADIM: any[] yerine MovementData[] kullanıyoruz
interface MovementsDesktopTableProps {
  movements: MovementData[];
}

export default function MovementsDesktopTable({
  movements,
}: MovementsDesktopTableProps) {
  return (
    <TableContainer
      component={Card}
      elevation={0}
      sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}
    >
      <Table size="medium">
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>
              İşlem Tipi
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>
              Ürün Bilgisi
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, color: "#4B5563" }}
              align="center"
            >
              Miktar
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>
              Konum / Raf
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563" }}>
              Zaman
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563" }} align="right">
              Operatör
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{
                bgcolor: index % 2 === 0 ? "transparent" : "#FDFDFD",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ py: 2 }}>
                <MovementTypeChip type={row.type} />
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ fontWeight: 600, color: "#111827", fontSize: "0.9rem" }}
                >
                  {row.product}
                </Typography>
                <Typography sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
                  {row.sku}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: row.type === "ÇIKIŞ" ? "#DC2626" : "#111827",
                }}
              >
                {row.qty}
              </TableCell>
              <TableCell
                sx={{ color: "#4B5563", fontSize: "0.875rem", fontWeight: 500 }}
              >
                {row.location}
              </TableCell>
              <TableCell sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
                {row.time}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#374151", fontWeight: 500, fontSize: "0.85rem" }}
              >
                {row.operator}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
