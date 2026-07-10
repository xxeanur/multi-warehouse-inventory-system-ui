import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";

interface CountData {
  id: number;
  sku: string;
  name: string;
  shelf: string;
  systemQty: number;
  countedQty: number;
  status: string;
}

interface TableProps {
  activeCounts: CountData[];
}

export default function InventoryCountTable({ activeCounts }: TableProps) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #E5E7EB", width: "100%", overflow: "hidden" }}>
      <Box sx={{ px: { xs: 3, md: 4 }, py: 3, borderBottom: "1px solid #E5E7EB", bgcolor: "#FAFAFA" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
          Anlık Sayım Seansı Verileri
        </Typography>
      </Box>

      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead sx={{ bgcolor: "#FFFFFF" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#6B7280", py: 2, px: { xs: 2, md: 4 } }}>Raf / Ürün</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#6B7280" }}>Sistem</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#6B7280" }}>Sayılan</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: "#6B7280", px: { xs: 2, md: 4 } }}>Durum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeCounts.map((row) => (
              <TableRow key={row.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell sx={{ py: 2.5, px: { xs: 2, md: 4 } }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}>{row.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#6B7280" }}>{row.shelf} • {row.sku}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "1rem" }}>{row.systemQty}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: "#111827", fontSize: "1rem" }}>{row.countedQty}</TableCell>
                <TableCell align="right" sx={{ px: { xs: 2, md: 4 } }}>
                  <Chip
                    label={row.status}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      borderRadius: 1.5,
                      px: 1,
                      bgcolor: row.status === "Eşleşti" ? "#D1FAE5" : row.status === "Eksik" ? "#FEE2E2" : "#FEF3C7",
                      color: row.status === "Eşleşti" ? "#065F46" : row.status === "Eksik" ? "#991B1B" : "#92400E",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}