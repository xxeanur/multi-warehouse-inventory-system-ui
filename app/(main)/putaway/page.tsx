"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";

import { PutawayListDto, PutawayDetailDto } from "@/types/inventory/putaway";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";
import { WarehouseDto } from "@/types/definitions/warehouse";

import { putawayService } from "@/services/inventory/putawayService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { warehouseZoneService } from "@/services/common/warehouseZoneService";
import { notifyError, notifySuccess } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext";

import PutawaySidebar from "@/components/putaway/PutawaySidebar";
import PutawayDetailPanel from "@/components/putaway/PutawayDetailPanel";
import { SplitPlacement } from "@/components/putaway/PutawayLineItem";

export default function PutawayPage() {
  const { confirm } = useConfirm();

  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>("");

  const [orders, setOrders] = useState<PutawayListDto[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PutawayDetailDto | null>(
    null,
  );
  const [zones, setZones] = useState<WarehouseZoneDto[]>([]);

  const [allPlacements, setAllPlacements] = useState<
    Record<string, SplitPlacement[]>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    warehouseService.getAllAsync().then((data) => {
      setWarehouses(data);
      if (data.length > 0) {
        setSelectedWarehouseId(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedWarehouseId) return;

    putawayService.getPendingAsync(selectedWarehouseId).then((data) => {
      setOrders(data);
    });

    setSelectedOrder(null);
    setAllPlacements({});
  }, [selectedWarehouseId]);

  const handleOrderClick = (documentId: string, documentType: string) => {
    putawayService.getDetailAsync(documentType, documentId).then((detail) => {
      setSelectedOrder(detail);
      setAllPlacements({});
      warehouseZoneService
        .getByWarehouseIdAsync(selectedWarehouseId)
        .then(setZones);
    });
  };

  const handlePlacementChange = useCallback(
    (lineId: string, splits: SplitPlacement[]) => {
      setAllPlacements((prev) => ({ ...prev, [lineId]: splits }));
    },
    [],
  );

  const handleSubmit = async () => {
    if (!selectedOrder || !selectedWarehouseId) return;

    const placedLines: {
      documentLineId: string;
      productId: string;
      shelfId: string;
      quantity: number;
    }[] = [];

    let hasError = false;

    selectedOrder.lines.forEach((line) => {
      const splits = allPlacements[line.documentLineId] || [];
      const totalPlaced = splits.reduce(
        (sum, s) => sum + Number(s.quantity),
        0,
      );

      if (totalPlaced !== line.quantityToPlace) {
        notifyError(
          `${line.productName} ürünü için yerleşen miktar (${totalPlaced}), dizilmesi gereken miktara (${line.quantityToPlace}) eşit olmalıdır!`,
        );
        hasError = true;
      }

      splits.forEach((split) => {
        if (!split.shelfId) {
          notifyError(
            `Lütfen ${line.productName} için tüm rafları seçtiğinizden emin olun.`,
          );
          hasError = true;
        } else if (split.quantity > 0) {
          placedLines.push({
            documentLineId: line.documentLineId,
            productId: line.productId,
            shelfId: split.shelfId,
            quantity: split.quantity,
          });
        }
      });
    });

    if (hasError) return;

    if (placedLines.length === 0) {
      notifyError(
        "Lütfen en az bir ürünü rafa yerleştirin (Raf seçimi zorunludur).",
      );
      return;
    }

    const isConfirmed = await confirm({
      title: "Raflara Yerleştir",
      description:
        "Seçili ürünlerin belirlediğiniz raflara yerleştirilmesini onaylıyor musunuz?",
      confirmText: "Evet, Yerleştir",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    setIsSubmitting(true);

    putawayService
      .executeAsync({
        documentId: selectedOrder.documentId,
        documentType: selectedOrder.documentType,
        warehouseId: selectedWarehouseId,
        placedLines: placedLines,
      })
      .then(() => {
        notifySuccess(
          "Tüm ürünler başarıyla raflara yerleştirildi ve stoklar güncellendi!",
        );
        setOrders((prev) =>
          prev.filter((o) => o.documentId !== selectedOrder.documentId),
        );
        setSelectedOrder(null);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#111827",
              mb: 0.5,
              letterSpacing: "-0.5px",
            }}
          >
            Rafa Yerleştirme (Putaway)
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Mal kabulü tamamlanmış tedarikçi fişlerini veya gelen transferleri
            depo raflarına yerleştirin.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <PutawaySidebar
              warehouses={warehouses}
              selectedWarehouseId={selectedWarehouseId}
              onWarehouseChange={setSelectedWarehouseId}
              orders={orders}
              selectedOrderId={selectedOrder?.documentId}
              onOrderSelect={handleOrderClick}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <PutawayDetailPanel
              selectedOrder={selectedOrder}
              selectedWarehouseId={selectedWarehouseId}
              zones={zones}
              isSubmitting={isSubmitting}
              onPlacementChange={handlePlacementChange}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
