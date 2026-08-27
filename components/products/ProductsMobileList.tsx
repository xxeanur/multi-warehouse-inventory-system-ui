"use client";

import { Stack, Card, Box, Typography, Chip, Divider } from "@mui/material";

import { ProductData } from "@/app/(main)/products/page";

interface ProductsMobileListProps {
  products: ProductData[];
  onRowClick: (product: ProductData) => void;
}

export default function ProductsMobileList({
  products,
  onRowClick,
}: ProductsMobileListProps) {
  if (products.length === 0) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          color: "#6B7280",
          py: 4,
          fontSize: "0.875rem",
        }}
      >
        Aradığınız kriterlere uygun ürün bulunamadı.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {products.map((row) => (
        <Card
          key={row.id}
          elevation={0}
          onClick={() => onRowClick(row)}
          sx={{
            p: 2,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            cursor: "pointer",
            "&:active": { bgcolor: "#F9FAFB" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}
              >
                {row.name}
              </Typography>
              <Typography
                sx={{ color: "#6B7280", fontSize: "0.75rem", mt: 0.2 }}
              >
                {row.sku} • {row.category}
              </Typography>
            </Box>
            {row.totalStock <= row.criticalLevel ? (
              <Chip
                label="Kritik"
                size="small"
                sx={{
                  bgcolor: "#FEF2F2",
                  color: "#DC2626",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  fontSize: "0.7rem",
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
                  fontSize: "0.7rem",
                }}
              />
            )}
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
            <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>
              Depo: <strong>{row.warehouse}</strong>
            </Typography>
            <Typography
              sx={{ fontSize: "0.85rem", color: "#111827", fontWeight: 700 }}
            >
              Stok: {row.totalStock}
            </Typography>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}