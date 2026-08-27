// components/products/ProductsDesktopTable.tsx
"use client";

import {
  Card, Table, TableBody, TableCell,  TableContainer,  TableHead, TableRow, Typography,  Chip,
} from "@mui/material";
import { ProductData } from "@/app/(main)/products/page";


interface ProductsDesktopTableProps {
  products: ProductData[];
  onRowClick: (product: ProductData) => void;
  isSuperAdmin?: boolean;
  onEdit?: () => void;
  onDeleteSuccess?: () => void;
}

export default function ProductsDesktopTable({
  products,
  onRowClick,
  isSuperAdmin = false,

}: ProductsDesktopTableProps) {


  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 3, border: "1px solid #E5E7EB", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Stok Kodu (SKU)</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Ürün Adı</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Marka</TableCell> 
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Kategori</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Fiyat</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Depo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }} align="center">Toplam Stok</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#4B5563" }} align="right">Durum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => onRowClick(row)}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell sx={{ fontWeight: 500, color: "#374151" }}>{row.sku}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#111827" }}>{row.name}</TableCell>
                  <TableCell sx={{ color: "#6B7280" }}>{row.brand || "-"}</TableCell> 
                  <TableCell sx={{ color: "#6B7280" }}>{row.category}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#111827" }}>{row.unitPrice} ₺</TableCell>
                  <TableCell sx={{ color: "#6B7280" }}>{row.warehouse}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: "#111827", fontSize: "1rem" }}>
                    {row.totalStock}
                  </TableCell>
                  <TableCell align="right">
                    {row.totalStock <= row.criticalLevel ? (
                      <Chip
                        label="Kritik"
                        size="small"
                        sx={{
                          bgcolor: "#FEF2F2",
                          color: "#DC2626",
                          fontWeight: 600,
                          borderRadius: 1.5,
                          px: 0.5,
                        }}
                      />
                    ) : (
                      <Chip
                        label="Yeterli"
                        size="small"
                        sx={{
                          bgcolor: "#D1FAE5",
                          color: "#065F46",
                          fontWeight: 600,
                          borderRadius: 1.5,
                          px: 0.5,
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={isSuperAdmin ? 9 : 8} 
                  align="center"
                  sx={{ py: 6, color: "#6B7280" }}
                >
                  <Typography variant="body2">
                    Aradığınız kriterlere uygun ürün bulunamadı.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}