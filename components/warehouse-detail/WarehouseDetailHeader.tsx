"use client";

import { Box, IconButton, Typography, Chip, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { WarehouseOperationalStatus } from "@/types/definitions/warehouse";

interface WarehouseDetailHeaderProps {
  warehouse: {
    name: string;
    city: string;
    manager: string;
    operationalStatus: WarehouseOperationalStatus;
    usedCapacity?: number;
    maxCapacity?: number;
  };
  canEdit: boolean;
  onBack: () => void;
  onEdit: () => void;
}

export default function WarehouseDetailHeader({
  warehouse,
  canEdit,
  onBack,
  onEdit,
}: WarehouseDetailHeaderProps) {
  // Doluluk oranına göre kritik durumu hesapla
  const fillPercentage =
    warehouse.maxCapacity && warehouse.maxCapacity > 0
      ? ((warehouse.usedCapacity || 0) / warehouse.maxCapacity) * 100
      : 0;
  const isCritical = fillPercentage > 90;

  const getStatusChipConfig = (status: WarehouseOperationalStatus) => {
    if (status === WarehouseOperationalStatus.Active && isCritical) {
      return {
        label: "Dolu",
        bgcolor: "#FEF2F2",
        color: "#DC2626",
      };
    }

    switch (status) {
      case WarehouseOperationalStatus.Active:
        return {
          label: "Aktif",
          bgcolor: "#ECFCCB",
          color: "#047857",
        };
      case WarehouseOperationalStatus.Passive:
        return {
          label: "Pasif",
          bgcolor: "#FEF2F2",
          color: "#DC2626",
        };
      case WarehouseOperationalStatus.UnderMaintenance:
        return {
          label: "Bakımda",
          bgcolor: "#FEF3C7",
          color: "#D97706",
        };
      default:
        return {
          label: "Bilinmiyor",
          bgcolor: "#F3F4F6",
          color: "#6B7280",
        };
    }
  };

  const statusConfig = getStatusChipConfig(warehouse.operationalStatus);

  const actionButtonStyle = {
    color: "#374151",
    bgcolor: "#FFFFFF",
    border: "1px solid #D1D5DB",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.875rem",
    borderRadius: 2.5,
    px: 2.5,
    py: 1,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s",
    "&:hover": {
      bgcolor: "#F9FAFB",
      borderColor: "#9CA3AF",
    },
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2 } }}>
          <IconButton
            onClick={onBack}
            sx={{
              bgcolor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              width: 42,
              height: 42,
              borderRadius: 3,
              flexShrink: 0,
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                bgcolor: "#F9FAFB",
                borderColor: "#D1D5DB",
              },
            }}
          >
            <ArrowBackIcon sx={{ color: "#374151", fontSize: 20 }} />
          </IconButton>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
                mb: 1,
                minHeight: 42,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  fontSize: { xs: "1.25rem", sm: "1.75rem" },
                  letterSpacing: "-0.5px",
                }}
              >
                {warehouse.name}
              </Typography>
              <Chip
                label={statusConfig.label}
                size="small"
                sx={{
                  bgcolor: statusConfig.bgcolor,
                  color: statusConfig.color,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderRadius: "16px",
                  height: 24,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2.5,
                color: "#6B7280",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 500,
                }}
              >
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 18, color: "#9CA3AF" }}
                />{" "}
                {warehouse.city}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 500,
                }}
              >
                <PersonOutlineOutlinedIcon
                  sx={{ fontSize: 18, color: "#9CA3AF" }}
                />{" "}
                Depo Sorumlusu : {warehouse.manager}
              </Typography>
            </Box>
          </Box>
        </Box>

        {canEdit && (
          <Button
            onClick={onEdit}
            variant="outlined"
            startIcon={<EditOutlinedIcon sx={{ fontSize: 18 }} />}
            sx={{
              ...actionButtonStyle,
              display: { xs: "none", sm: "flex" },
            }}
          >
            Depoyu Düzenle
          </Button>
        )}
      </Box>

      {canEdit && (
        <Button
          onClick={onEdit}
          variant="outlined"
          startIcon={<EditOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={{
            ...actionButtonStyle,
            display: { xs: "flex", sm: "none" },
            width: "100%",
            mt: 3,
          }}
        >
          Depoyu Düzenle
        </Button>
      )}
    </Box>
  );
}
