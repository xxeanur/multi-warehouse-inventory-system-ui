"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

import LayoutWrapper from "@/components/LayoutWrapper";
import AddWarehouseModal from "@/components/warehouses/AddWarehouseModal";
import AddZoneModal from "@/components/warehouse-detail/AddZoneModal";
import AddShelfModal from "@/components/warehouse-detail/AddShelfModal";
import ShelfDetailDrawer from "@/components/warehouse-detail/ShelfDetailDrawer";

import WarehouseDetailHeader from "@/components/warehouse-detail/WarehouseDetailHeader";
import WarehouseCapacityCard from "@/components/warehouse-detail/WarehouseCapacityCard";
import WarehouseZoneMap, {
  MappedShelf,
  MappedZone,
} from "@/components/warehouse-detail/WarehouseZoneMap";

import { warehouseService } from "@/services/definitions/warehouseService";
import { warehouseZoneService } from "@/services/common/warehouseZoneService";
import { shelfService } from "@/services/definitions/shelfService";
import { userService } from "@/services/identity/userService";

import { WarehouseDto } from "@/types/definitions/warehouse";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";
import { ShelfDto } from "@/types/definitions/shelf";
import { UserDto, UserRole } from "@/types/identity/user";

import { useConfirm } from "@/contexts/ConfirmContext";
import { notifySuccess } from "@/lib/notificationService";

export default function WarehouseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const warehouseId = params?.id as string;
  const { confirm } = useConfirm();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [zoneToEdit, setZoneToEdit] = useState<WarehouseZoneDto | null>(null);

  const [isShelfModalOpen, setIsShelfModalOpen] = useState(false);
  const [selectedZoneIdForShelf, setSelectedZoneIdForShelf] =
    useState<string>("");
  const [shelfToEdit, setShelfToEdit] = useState<ShelfDto | null>(null);

  const [selectedShelfForDrawer, setSelectedShelfForDrawer] =
    useState<MappedShelf | null>(null);
  const [isShelfDrawerOpen, setIsShelfDrawerOpen] = useState(false);
  const [selectedZoneIdForDrawer, setSelectedZoneIdForDrawer] =
    useState<string>("");

  const [warehouse, setWarehouse] = useState<WarehouseDto | null>(null);
  const [managerName, setManagerName] = useState<string>("Atanmamış");
  const [zones, setZones] = useState<MappedZone[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!warehouseId) return;

      setLoading(true);
      try {
        const [warehouseData, meData, zonesData] = await Promise.all([
          warehouseService.getByIdAsync(warehouseId),
          userService.getMeAsync(),
          warehouseZoneService.getByWarehouseIdAsync(warehouseId),
        ]);

        const fetchedManagerName = warehouseData.managerName || "Atanmamış";

        const mappedZones: MappedZone[] = await Promise.all(
          zonesData.map(async (z) => {
            let shelvesData: ShelfDto[] = [];
            try {
              shelvesData = await shelfService.getByZoneIdAsync(z.id);
            } catch {
              shelvesData = [];
            }

            return {
              zoneId: z.id,
              zoneName: z.zoneName,
              zoneType: z.zoneType,
              shelves: shelvesData.map((s) => ({
                id: s.id,
                shelfNumber: s.shelfNumber,
                maxVolumeCm3: s.maxVolume,
                currentVolumeCm3: s.currentVolume,
                maxWeightKg: s.maxWeight,
                currentWeightKg: s.currentWeight,
                status:
                  s.status === 0
                    ? "Normal"
                    : s.status === 1
                      ? "Bakımda"
                      : "Rezerve",
                width: s.width,
                height: s.height,
                depth: s.depth,
              })),
            };
          }),
        );

        if (isMounted) {
          setWarehouse(warehouseData);
          setManagerName(fetchedManagerName);
          setCurrentUser(meData);
          setZones(mappedZones);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) setLoading(false);
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, [warehouseId]);

  const handleRefresh = async () => {
    if (!warehouseId) return;
    try {
      const warehouseData = await warehouseService.getByIdAsync(warehouseId);
      const fetchedManagerName = warehouseData.managerName || "Atanmamış";
      const zonesData: WarehouseZoneDto[] =
        await warehouseZoneService.getByWarehouseIdAsync(warehouseId);

      const mappedZones: MappedZone[] = await Promise.all(
        zonesData.map(async (z) => {
          let shelvesData: ShelfDto[] = [];
          try {
            shelvesData = await shelfService.getByZoneIdAsync(z.id);
          } catch {
            shelvesData = [];
          }

          return {
            zoneId: z.id,
            zoneName: z.zoneName,
            zoneType: z.zoneType,
            shelves: shelvesData.map((s) => ({
              id: s.id,
              shelfNumber: s.shelfNumber,
              maxVolumeCm3: s.maxVolume,
              currentVolumeCm3: s.currentVolume,
              maxWeightKg: s.maxWeight,
              currentWeightKg: s.currentWeight,
              status:
                s.status === 0
                  ? "Normal"
                  : s.status === 1
                    ? "Bakımda"
                    : "Rezerve",
              width: s.width,
              height: s.height,
              depth: s.depth,
            })),
          };
        }),
      );

      setWarehouse(warehouseData);
      setManagerName(fetchedManagerName);
      setZones(mappedZones);
    } catch (error) {
      console.error("Yenileme hatası:", error);
    }
  };

  // ----- RAF İŞLEMLERİ -----
  const handleOpenAddShelfModal = (zoneId: string) => {
    setSelectedZoneIdForShelf(zoneId);
    setShelfToEdit(null);
    setIsShelfModalOpen(true);
  };

  const handleOpenEditShelfModal = (zoneId: string, shelf: MappedShelf) => {
    setSelectedZoneIdForShelf(zoneId);
    setShelfToEdit({
      id: shelf.id,
      shelfNumber: shelf.shelfNumber,
      width: shelf.width,
      height: shelf.height,
      depth: shelf.depth,
      maxVolume: shelf.maxVolumeCm3,
      maxWeight: shelf.maxWeightKg,
      currentVolume: shelf.currentVolumeCm3,
      currentWeight: shelf.currentWeightKg,
      status:
        shelf.status === "Normal" ? 0 : shelf.status === "Bakımda" ? 1 : 2,
      warehouseZoneId: zoneId,
      createdDate: "",
      isActive: true,
    });
    setIsShelfModalOpen(true);
  };

  const handleSelectShelf = (shelf: MappedShelf, zoneId: string) => {
    setSelectedShelfForDrawer(shelf);
    setSelectedZoneIdForDrawer(zoneId);
    setIsShelfDrawerOpen(true);
  };

  const handleConfirmDeleteShelf = async (shelfId: string) => {
    const isConfirmed = await confirm({
      title: "Rafı Sil",
      description:
        "Bu rafı silmek istediğinize emin misiniz? İçi dolu raflar silinemez.",
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });

    if (isConfirmed) {
      await shelfService.removeAsync(shelfId);
      notifySuccess("Raf başarıyla silindi.");
      setIsShelfDrawerOpen(false);
      await handleRefresh();
    }
  };

  // ----- BLOK (ZONE) İŞLEMLERİ -----
  const handleConfirmDeleteZone = async (zoneId: string) => {
    const isConfirmed = await confirm({
      title: "Bloğu Sil",
      description:
        "Bu bloğu silmek istediğinize emin misiniz? İçinde raf bulunan bloklar silinemez.",
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });

    if (isConfirmed) {
      await warehouseZoneService.removeAsync(zoneId);
      notifySuccess("Blok başarıyla silindi.");
      await handleRefresh();
    }
  };

  // YETKİLENDİRME DEĞİŞKENLERİ
  const canEditWarehouse = currentUser?.role === UserRole.SuperAdmin;
  const canManageZonesAndShelves =
    currentUser?.role === UserRole.SuperAdmin ||
    (currentUser?.role === UserRole.WarehouseManager &&
      currentUser.warehouseId === warehouseId);

  if (loading) {
    return (
      <LayoutWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress sx={{ color: "#172C4A" }} />
        </Box>
      </LayoutWrapper>
    );
  }

  if (!warehouse) {
    return (
      <LayoutWrapper>
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h5" color="error">
            Depo bulunamadı.
          </Typography>
        </Box>
      </LayoutWrapper>
    );
  }

  const headerData = {
    name: warehouse.name,
    city: warehouse.city,
    manager: managerName,
    operationalStatus: warehouse.operationalStatus,
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 4 },
          pb: 8,
          pt: 2,
        }}
      >
        <WarehouseDetailHeader
          warehouse={headerData}
          canEdit={canEditWarehouse}
          onBack={() => router.back()}
          onEdit={() => setIsEditModalOpen(true)}
        />

        <WarehouseCapacityCard
          totalCapacity={warehouse.maxCapacity}
          filledCapacity={warehouse.usedCapacity}
        />

        <WarehouseZoneMap
          zones={zones}
          canManage={canManageZonesAndShelves}
          onAddZone={() => {
            setZoneToEdit(null);
            setIsZoneModalOpen(true);
          }}
          onEditZone={(zone) => {
            setZoneToEdit({
              id: zone.zoneId,
              warehouseId: warehouseId,
              zoneName: zone.zoneName,
              zoneType: zone.zoneType,
              createdDate: "",
              isActive: true,
            });
            setIsZoneModalOpen(true);
          }}
          onDeleteZone={handleConfirmDeleteZone}
          onAddShelf={handleOpenAddShelfModal}
          onEditShelf={handleOpenEditShelfModal}
          onDeleteShelf={handleConfirmDeleteShelf}
          onSelectShelf={(shelf) => {
            const parentZone = zones.find((z) =>
              z.shelves.some((s) => s.id === shelf.id),
            );
            if (parentZone) {
              handleSelectShelf(shelf, parentZone.zoneId);
            }
          }}
        />

        <ShelfDetailDrawer
          open={isShelfDrawerOpen}
          onClose={() => setIsShelfDrawerOpen(false)}
          shelf={selectedShelfForDrawer}
          canManage={canManageZonesAndShelves}
          onEdit={() => {
            if (selectedShelfForDrawer && selectedZoneIdForDrawer) {
              setIsShelfDrawerOpen(false);
              handleOpenEditShelfModal(
                selectedZoneIdForDrawer,
                selectedShelfForDrawer,
              );
            }
          }}
          onDeleteSuccess={async () => {
            setIsShelfDrawerOpen(false);
            await handleRefresh();
          }}
        />

        {canEditWarehouse && (
          <AddWarehouseModal
            open={isEditModalOpen}
            warehouseToEdit={warehouse}
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={() => void handleRefresh()}
          />
        )}

        {canManageZonesAndShelves && (
          <>
            <AddZoneModal
              open={isZoneModalOpen}
              warehouseId={warehouseId}
              zoneToEdit={zoneToEdit}
              onClose={() => {
                setIsZoneModalOpen(false);
                setZoneToEdit(null);
              }}
              onSuccess={() => void handleRefresh()}
            />

            {selectedZoneIdForShelf && (
              <AddShelfModal
                key={shelfToEdit ? shelfToEdit.id : "new-shelf"}
                open={isShelfModalOpen}
                zoneId={selectedZoneIdForShelf}
                shelfToEdit={shelfToEdit}
                onClose={() => {
                  setIsShelfModalOpen(false);
                  setSelectedZoneIdForShelf("");
                  setShelfToEdit(null);
                }}
                onSuccess={() => void handleRefresh()}
              />
            )}
          </>
        )}
      </Box>
    </LayoutWrapper>
  );
}
