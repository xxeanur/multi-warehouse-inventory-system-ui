"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ZoneSection from "./zone-map/ZoneSection"; 
export interface MappedShelf {
  id: string;
  shelfNumber: string;
  maxVolumeCm3: number;
  currentVolumeCm3: number;
  maxWeightKg: number;
  currentWeightKg: number;
  status: string;
  width: number;
  height: number;
  depth: number;
}

export interface MappedZone {
  zoneId: string;
  zoneName: string;
  zoneType: number;
  shelves: MappedShelf[];
}

interface WarehouseZoneMapProps {
  zones: MappedZone[];
  canManage: boolean;
  onAddZone: () => void;
  onEditZone: (zone: MappedZone) => void;
  onDeleteZone: (zoneId: string) => void;
  onAddShelf: (zoneId: string) => void;
  onEditShelf: (zoneId: string, shelf: MappedShelf) => void;
  onDeleteShelf: (shelfId: string) => void;
  onSelectShelf?: (shelf: MappedShelf) => void;
}

export default function WarehouseZoneMap({
  zones, canManage, onAddZone, onAddShelf, onEditShelf, onDeleteShelf, onSelectShelf, onEditZone, onDeleteZone,
}: WarehouseZoneMapProps) {
  const safeZones = Array.isArray(zones) ? zones : [];

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "flex-end" }, gap: { xs: 2, sm: 0 }, mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#222222", mb: 1 }}>
            Raf ve Blok Düzeni
          </Typography>
          <Typography sx={{ color: "#717171", fontWeight: 500 }}>
            Depo içindeki blokları ve bağlı rafların doluluk oranlarını takip edin.
          </Typography>
        </Box>

        {canManage && (
          <Button
            onClick={onAddZone}
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            sx={{
              bgcolor: "#172C4A", color: "#FFFFFF", textTransform: "none", fontWeight: 600, borderRadius: 3, px: { xs: 2.5, sm: 3.5 }, py: 1, width: { xs: "100%", sm: "auto" },
              boxShadow: "0px 4px 14px rgba(23, 44, 74, 0.15)", transition: "all 0.2s ease-in-out",
              "&:hover": { bgcolor: "#0F1D33", boxShadow: "0px 6px 20px rgba(23, 44, 74, 0.25)", transform: "translateY(-2px)" },
            }}
          >
            Yeni Blok Ekle
          </Button>
        )}
      </Box>

      <Stack spacing={5}>
        {safeZones.map((zone) => (
          <ZoneSection
            key={zone.zoneId}
            zone={zone}
            canManage={canManage}
            onEditZone={onEditZone}
            onDeleteZone={onDeleteZone}
            onAddShelf={onAddShelf}
            onEditShelf={onEditShelf}
            onDeleteShelf={onDeleteShelf}
            onSelectShelf={onSelectShelf}
          />
        ))}
      </Stack>
    </Box>
  );
}