"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";

import LayoutWrapper from "@/components/LayoutWrapper";
import MovementsHeader from "@/components/movements/MovementsHeader";
import MovementsFilter from "@/components/movements/MovementsFilter";
import MovementsTable from "@/components/movements/MovementsTable";
import MovementDetailDrawer from "@/components/movements/MovementDetailDrawer";

import { stockMovementService } from "@/services/inventory/stockMovementService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { StockMovementDto } from "@/types/inventory/stockMovement";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { UserRole } from "@/types/identity/user";

export interface MovementData {
  id: string;
  direction: string;
  typeName: string;
  product: string;
  sku: string;
  qty: string;
  location: string;
  time: string;
  operator: string;
}

export default function MovementsPage() {
  const [mappedMovements, setMappedMovements] = useState<MovementData[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [filterDirection, setFilterDirection] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<number | "ALL">("ALL");
  const [filterWarehouse, setFilterWarehouse] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMovementId, setSelectedMovementId] = useState<string | null>(
    null,
  );
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const userContextStr = localStorage.getItem("userContext");
    if (userContextStr) {
      try {
        const user = JSON.parse(userContextStr);
        setUserRole(user.role as UserRole);
      } catch (error) {
        console.error("User role parse error", error);
      }
    }

    warehouseService
      .getAllAsync()
      .then((data) => setWarehouses(data))
      .catch((err) => console.error("Depolar yüklenirken hata:", err));
  }, []);

  const fetchMovements = useCallback(() => {
    setLoading(true);

    stockMovementService
      .getPagedAsync({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
        direction: filterDirection !== "ALL" ? filterDirection : undefined,
        movementType: filterType !== "ALL" ? (filterType as number) : undefined,
        warehouseId: filterWarehouse !== "ALL" ? filterWarehouse : undefined,
      })
      .then((pagedResult) => {
        const formattedData: MovementData[] = pagedResult.data.map(
          (m: StockMovementDto) => {
            const qtyPrefix =
              m.movementDirection === "GİRİŞ"
                ? "+"
                : m.movementDirection === "ÇIKIŞ"
                  ? "-"
                  : "";

            return {
              id: m.id,
              direction: m.movementDirection || "BİLİNMEYEN",
              typeName: m.movementTypeName || "-",
              product: m.productName,
              sku: m.productCode,
              qty: `${qtyPrefix}${m.quantity}`,
              location: `${m.warehouseName} - ${m.shelfCode}`,
              time: new Date(m.createdDate).toLocaleString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              operator: m.operatorName || "Bilinmeyen",
            };
          },
        );

        setMappedMovements(formattedData);
        setTotalPages(pagedResult.totalPages);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    pageNumber,
    pageSize,
    searchTerm,
    filterDirection,
    filterType,
    filterWarehouse,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovements();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchMovements]);

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 0 },
          pb: 8,
          overflowX: "hidden",
        }}
      >
        <MovementsHeader />

        <MovementsFilter
          warehouses={warehouses}
          userRole={userRole}
          filterWarehouse={filterWarehouse}
          setFilterWarehouse={(val) => {
            setFilterWarehouse(val);
            setPageNumber(1);
          }}
          filterDirection={filterDirection}
          setFilterDirection={(val) => {
            setFilterDirection(val);
            setFilterType("ALL");
            setPageNumber(1);
          }}
          filterType={filterType}
          setFilterType={(val) => {
            setFilterType(val);
            setPageNumber(1);
          }}
          searchTerm={searchTerm}
          setSearchTerm={(val) => {
            setSearchTerm(val);
            setPageNumber(1);
          }}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#172C4A" }} />
          </Box>
        ) : mappedMovements.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#6B7280", py: 5 }}>
            Kayıt bulunamadı.
          </Typography>
        ) : (
          <MovementsTable
            movements={mappedMovements}
            onRowClick={(id) => {
              setSelectedMovementId(id);
              setDrawerOpen(true);
            }}
          />
        )}

        {!loading && totalPages > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={pageNumber}
              onChange={(_, page) => setPageNumber(page)}
              color="primary"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  bgcolor: "#172C4A",
                  color: "#fff",
                },
              }}
            />
          </Box>
        )}

        <MovementDetailDrawer
          open={drawerOpen}
          movementId={selectedMovementId}
          onClose={() => setDrawerOpen(false)}
        />
      </Box>
    </LayoutWrapper>
  );
}
