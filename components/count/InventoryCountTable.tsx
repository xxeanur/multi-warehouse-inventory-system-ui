"use client";

import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import { ActiveCountItem } from "@/app/(main)/count/page";

interface TableProps {
  activeCounts: ActiveCountItem[];
}

export default function InventoryCountTable({ activeCounts }: TableProps) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #E5E7EB", width: "100%", overflow: "hidden" }}>
      <Box sx={{ px: { xs: 3, md: 4 }, py: 3, borderBottom: "1px solid #E5E7EB", bgcolor: "#FAFAFA", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
          Anlık Sayım Seansı Verileri
        </Typography>
        <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
          {activeCounts.length} Kayıt
        </Typography>
      </Box>

      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead sx={{ bgcolor: "#FFFFFF" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#6B7280", py: 2, px: { xs: 2, md: 4 } }}>Raf / Ürün</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#6B7280" }}>Sistem</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#6B7280" }}>Sayılan</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#6B7280" }}>Fark</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: "#6B7280", px: { xs: 2, md: 4 } }}>Durum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeCounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: "#9CA3AF" }}>
                  Henüz sayım kaydı bulunmuyor. Sol taraftaki formu kullanarak sayıma başlayın.
                </TableCell>
              </TableRow>
            ) : (
              activeCounts.map((row) => (
                <TableRow key={row.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={{ py: 2.5, px: { xs: 2, md: 4 } }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}>{row.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>{row.shelf} • {row.sku}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "1rem" }}>{row.systemQty}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#111827", fontSize: "1rem" }}>{row.countedQty}</TableCell>
                  
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: "0.95rem", color: row.variance > 0 ? "#059669" : row.variance < 0 ? "#DC2626" : "#6B7280" }}>
                    {row.variance > 0 ? `+${row.variance}` : row.variance}
                  </TableCell>
                  
                  <TableCell align="right" sx={{ px: { xs: 2, md: 4 } }}>
                    <Chip
                      label={row.statusName}
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        borderRadius: 1.5,
                        px: 1,
                        // Enum Değerleri: 1 (Eşleşti), 2 (Eksik), 3 (Fazla)
                        bgcolor: row.status === 1 ? "#D1FAE5" : row.status === 2 ? "#FEE2E2" : "#FEF3C7",
                        color: row.status === 1 ? "#065F46" : row.status === 2 ? "#991B1B" : "#92400E",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}