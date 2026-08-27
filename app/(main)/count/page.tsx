"use client";

import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";

import InventoryCountHeader from "@/components/count/InventoryCountHeader";
import InventoryCountForm from "@/components/count/InventoryCountForm";
import InventoryCountTable from "@/components/count/InventoryCountTable";

import { WarehouseDto } from "@/types/definitions/warehouse";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";
import { ShelfDto } from "@/types/definitions/shelf";

import { warehouseService } from "@/services/definitions/warehouseService";
import { warehouseZoneService } from "@/services/common/warehouseZoneService";
import { shelfService } from "@/services/definitions/shelfService";
import { inventoryCountService } from "@/services/inventory/inventoryCountService";
import { notifySuccess } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext"; // YENİ: Confirm eklendi

export interface ActiveCountItem {
  id: string;
  sku: string;
  name: string;
  shelf: string;
  systemQty: number;
  countedQty: number;
  variance: number;
  status: number;
  statusName: string;
}

export default function InventoryCountPage() {
  const { confirm } = useConfirm(); // Confirm kancası

  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [zones, setZones] = useState<WarehouseZoneDto[]>([]);
  const [shelves, setShelves] = useState<ShelfDto[]>([]);

  const [activeCounts, setActiveCounts] = useState<ActiveCountItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    warehouseService.getAllAsync().then((warehousesData) => {
      if (isMounted) {
        setWarehouses(warehousesData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleWarehouseChange = (warehouseId: string) => {
    setZones([]);
    setShelves([]);
    if (warehouseId) {
      warehouseZoneService
        .getByWarehouseIdAsync(warehouseId)
        .then((data) => setZones(data));
    }
  };

  const handleZoneChange = (zoneId: string) => {
    setShelves([]);
    if (zoneId) {
      shelfService.getByZoneIdAsync(zoneId).then((data) => setShelves(data));
    }
  };

  const handleCountSubmit = async (formData: {
    warehouseId: string;
    shelfId: string;
    productId: string;
    quantity: number;
  }) => {
    // YENİ: Sayım onayı
    const isConfirmed = await confirm({
      title: "Sayım Sonucunu Kaydet",
      description:
        "Girdiğiniz fiziki sayım sonucu sisteme işlenecektir. Fark çıkması durumunda stoklar otomatik olarak eşitlenecek ve düzeltme fişi oluşturulacaktır. Onaylıyor musunuz?",
      confirmText: "Evet, Kaydet",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    setIsSubmitting(true);

    inventoryCountService
      .performCountAsync({
        warehouseId: formData.warehouseId,
        shelfId: formData.shelfId,
        productId: formData.productId,
        countedQuantity: formData.quantity,
      })
      .then((result) => {
        notifySuccess("Fiziksel sayım başarıyla kaydedildi.");

        setActiveCounts((prev) => [
          {
            id: crypto.randomUUID(),
            sku: result.sku,
            name: result.productName,
            shelf: result.shelfCode,
            systemQty: result.systemQuantity,
            countedQty: result.countedQuantity,
            variance: result.variance,
            status: result.status,
            statusName: result.statusName,
          },
          ...prev,
        ]);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
          pb: 8,
        }}
      >
        <InventoryCountHeader />

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <InventoryCountForm
              warehouses={warehouses}
              zones={zones}
              shelves={shelves}
              onWarehouseChange={handleWarehouseChange}
              onZoneChange={handleZoneChange}
              onSubmit={handleCountSubmit}
              isSubmitting={isSubmitting}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <InventoryCountTable activeCounts={activeCounts} />
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
}
