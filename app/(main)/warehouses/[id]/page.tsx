"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box } from "@mui/material";

import LayoutWrapper from "../../../../components/LayoutWrapper";
import AddWarehouseModal from "@/components/warehouses/AddWarehouseModal";
import AddZoneModal from "@/components/warehouse-detail/AddZoneModal";

import WarehouseDetailHeader from "@/components/warehouse-detail/WarehouseDetailHeader";
import WarehouseCapacityCard from "@/components/warehouse-detail/WarehouseCapacityCard";
import WarehouseZoneMap from "@/components/warehouse-detail/WarehouseZoneMap";

const mockZones = [
  {
    zoneName: "A Bloğu - Elektronik",
    shelves: [
      { id: "A-01", maxVolumeCm3: 500000, currentVolumeCm3: 450000, maxWeightKg: 250, currentWeightKg: 180, status: "Kritik" },
      { id: "A-02", maxVolumeCm3: 500000, currentVolumeCm3: 200000, maxWeightKg: 250, currentWeightKg: 90, status: "Normal" },
      // ...diğer raflar
    ],
  },
];
export default function WarehouseDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);

  const warehouse = {
    name: "Konya Şube Deposu",
    id: params.id,
    city: "Konya",
    manager: "Ahmet Yılmaz",
    status: "Aktif",
    totalCapacity: 5000,
    filledCapacity: 3200,
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: { xs: 2, sm: 4 }, pb: 8, pt: 2 }}>
        
        <WarehouseDetailHeader 
          warehouse={warehouse} 
          onBack={() => router.back()} 
          onEdit={() => setIsEditModalOpen(true)} 
        />

        <WarehouseCapacityCard 
          totalCapacity={warehouse.totalCapacity} 
          filledCapacity={warehouse.filledCapacity} 
        />

        <WarehouseZoneMap 
          zones={mockZones} 
          onAddZone={() => setIsZoneModalOpen(true)} 
        />

        {/* Modallar */}
        <AddWarehouseModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
        <AddZoneModal
          open={isZoneModalOpen}
          onClose={() => setIsZoneModalOpen(false)}
        />

      </Box>
    </LayoutWrapper>
  );
}