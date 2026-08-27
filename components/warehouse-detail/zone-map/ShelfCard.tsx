"use client";

import { Box, Typography, IconButton, LinearProgress } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { formatVolume } from "@/utils/formatters";
import { MappedShelf } from "../WarehouseZoneMap";

interface ShelfCardProps {
  shelf: MappedShelf;
  zoneId: string;
  canManage: boolean;
  onSelect?: (shelf: MappedShelf) => void;
  onEdit: (zoneId: string, shelf: MappedShelf) => void;
  onDelete: (shelfId: string) => void;
}

const getProgressColor = (currentVol: number, maxVol: number) => {
  if (maxVol === 0) return "#10B981";
  const percentage = (currentVol / maxVol) * 100;
  if (percentage >= 90) return "#FF385C";
  if (percentage >= 70) return "#F5A623";
  return "#10B981";
};

const getStatusIndicator = (status: string) => {
  const statusMap: Record<string, { color: string; label: string }> = {
    Dolu: { color: "#FF385C", label: "Dolu" },
    Kritik: { color: "#F5A623", label: "Kritik" },
    Boş: { color: "#10B981", label: "Müsait" },
    Normal: { color: "#10B981", label: "Normal" },
    Bakımda: { color: "#9CA3AF", label: "Bakımda" },
    Rezerve: { color: "#8B5CF6", label: "Rezerve" },
  };
  const mapped = statusMap[status] || statusMap.Normal;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: mapped.color, flexShrink: 0 }} />
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: mapped.color }}>{mapped.label}</Typography>
    </Box>
  );
};

export default function ShelfCard({ shelf, zoneId, canManage, onSelect, onEdit, onDelete }: ShelfCardProps) {
  const volPercentage = shelf.maxVolumeCm3 > 0 ? (shelf.currentVolumeCm3 / shelf.maxVolumeCm3) * 100 : 0;
  const safeVolPercentage = Math.min(100, Math.max(0, volPercentage));

  return (
    <Box
      onClick={() => onSelect && onSelect(shelf)}
      sx={{
        p: 3, height: "190px", display: "flex", flexDirection: "column", justifyContent: "space-between",
        borderRadius: 3, border: "1px solid #EBEBEB", bgcolor: "#FFFFFF", cursor: "pointer", overflow: "hidden", transition: "all 0.2s ease-in-out",
        "&:hover": { borderColor: "#222222", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)", transform: "translateY(-2px)" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, minWidth: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#222222", letterSpacing: "-0.5px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", flexGrow: 1, minWidth: 0 }} title={shelf.shelfNumber}>
          {shelf.shelfNumber}
        </Typography>

        {canManage && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
            <IconButton size="small" onClick={() => onEdit(zoneId, shelf)} sx={{ color: "#9CA3AF", "&:hover": { color: "#172C4A", bgcolor: "#F3F4F6" } }}>
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(shelf.id)} sx={{ color: "#9CA3AF", "&:hover": { color: "#DC2626", bgcolor: "#FEF2F2" } }}>
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box>{getStatusIndicator(shelf.status)}</Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography sx={{ fontWeight: 600, color: "#717171", fontSize: "0.75rem" }}>Hacim: {formatVolume(shelf.maxVolumeCm3)}</Typography>
          <Typography sx={{ fontWeight: 700, color: "#222222", fontSize: "0.75rem" }}>{Math.round(volPercentage)}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={safeVolPercentage} sx={{ height: 6, borderRadius: 3, mb: 1.5, bgcolor: "#F7F7F9", "& .MuiLinearProgress-bar": { bgcolor: getProgressColor(shelf.currentVolumeCm3, shelf.maxVolumeCm3), borderRadius: 3 } }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontWeight: 500, color: "#9CA3AF", fontSize: "0.7rem" }}>Ağırlık Yükü</Typography>
          <Typography sx={{ fontWeight: 600, color: "#4B5563", fontSize: "0.7rem" }}>
            {Number(shelf.currentWeightKg.toFixed(2))} / {Number(shelf.maxWeightKg.toFixed(2))} kg
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}