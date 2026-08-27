"use client";

import { Box, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { MappedZone, MappedShelf } from "../WarehouseZoneMap";
import ShelfCard from "./ShelfCard";

interface ZoneSectionProps {
  zone: MappedZone;
  canManage: boolean;
  onEditZone: (zone: MappedZone) => void;
  onDeleteZone: (zoneId: string) => void;
  onAddShelf: (zoneId: string) => void;
  onEditShelf: (zoneId: string, shelf: MappedShelf) => void;
  onDeleteShelf: (shelfId: string) => void;
  onSelectShelf?: (shelf: MappedShelf) => void;
}

const getZoneTypeName = (type: number) => {
  switch (type) {
    case 0: return "Genel Depolama";
    case 1: return "Soğuk Hava";
    case 2: return "Kontrollü Ortam";
    case 3: return "Tehlikeli Madde";
    case 4: return "Karantina";
    case 5: return "İade Alanı";
    case 6: return "Yüksek Değerli";
    default: return "Belirsiz";
  }
};

export default function ZoneSection({
  zone, canManage, onEditZone, onDeleteZone, onAddShelf, onEditShelf, onDeleteShelf, onSelectShelf
}: ZoneSectionProps) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5, pb: 1, borderBottom: "1px solid #EBEBEB" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#222222" }}>{zone.zoneName}</Typography>
          <Box sx={{ bgcolor: "#F3F4F6", color: "#4B5563", px: 1.5, py: 0.25, borderRadius: 1.5, fontSize: "0.75rem", fontWeight: 600 }}>
            {getZoneTypeName(zone.zoneType)}
          </Box>
          {canManage && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton size="small" onClick={() => onEditZone(zone)} sx={{ color: "#9CA3AF", "&:hover": { color: "#172C4A", bgcolor: "#F3F4F6" } }}>
                <EditOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" onClick={() => onDeleteZone(zone.zoneId)} sx={{ color: "#9CA3AF", "&:hover": { color: "#DC2626", bgcolor: "#FEF2F2" } }}>
                <DeleteOutlineIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          )}
        </Box>

        {canManage && (
          <Button onClick={() => onAddShelf(zone.zoneId)} size="small" variant="outlined" startIcon={<AddIcon sx={{ fontSize: 16 }} />} sx={{ color: "#172C4A", borderColor: "#172C4A", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: 2, "&:hover": { bgcolor: "#F3F4F6", borderColor: "#0F1D33" } }}>
            Raf Ekle
          </Button>
        )}
      </Box>

      {!zone.shelves || zone.shelves.length === 0 ? (
        <Typography variant="caption" sx={{ color: "#9CA3AF", fontStyle: "italic", display: "block", mb: 2 }}>
          Bu blokta henüz raf bulunmuyor.
        </Typography>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 3 }}>
          {zone.shelves.map((shelf) => (
            <ShelfCard key={shelf.id} shelf={shelf} zoneId={zone.zoneId} canManage={canManage} onSelect={onSelectShelf} onEdit={onEditShelf} onDelete={onDeleteShelf} />
          ))}
        </Box>
      )}
    </Box>
  );
}