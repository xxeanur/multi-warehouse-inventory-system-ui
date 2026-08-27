"use client";

import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import MovementTypeChip from "./MovementTypeChip";
import { MovementData } from "@/app/(main)/movements/page";

interface MovementsDesktopTableProps {
  movements: MovementData[];
  onRowClick: (id: string) => void; 
}

export default function MovementsDesktopTable({ movements, onRowClick }: MovementsDesktopTableProps) {
  return (
    <TableContainer component={Card} elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3, overflowX: "auto" }}>
      <Table size="medium" sx={{ minWidth: 800 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }}>İşlem</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }}>Ürün Bilgisi</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }} align="center">Miktar</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }}>Konum / Raf</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }}>Zaman</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }} align="right">Operatör</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((row, index) => (
            <TableRow 
              key={row.id} 
              onClick={() => onRowClick(row.id)} 
              sx={{ 
                bgcolor: index % 2 === 0 ? "transparent" : "#FDFDFD", 
                cursor: "pointer", 
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "#F3F4F6" }, 
                "&:last-child td, &:last-child th": { border: 0 } 
              }}
            >
              <TableCell sx={{ py: 2, whiteSpace: "nowrap" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-start" }}>
                  <MovementTypeChip direction={row.direction} />
                  <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>{row.typeName}</Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography sx={{ fontWeight: 600, color: "#111827", fontSize: "0.9rem" }}>{row.product}</Typography>
                <Typography sx={{ color: "#6B7280", fontSize: "0.75rem" }}>{row.sku}</Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: row.direction === "ÇIKIŞ" ? "#DC2626" : row.direction === "GİRİŞ" ? "#059669" : "#111827", whiteSpace: "nowrap" }}>
                {row.qty}
              </TableCell>
              <TableCell sx={{ color: "#4B5563", fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap" }}>{row.location}</TableCell>
              <TableCell sx={{ color: "#6B7280", fontSize: "0.85rem", whiteSpace: "nowrap" }}>{row.time}</TableCell>
              <TableCell align="right" sx={{ color: "#374151", fontWeight: 500, fontSize: "0.85rem", whiteSpace: "nowrap" }}>{row.operator}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}