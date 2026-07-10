"use client";

import { Box, IconButton, Typography, Chip, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface WarehouseDetailHeaderProps {
  warehouse: {
    name: string;
    city: string;
    manager: string;
    status: string;
  };
  onBack: () => void;
  onEdit: () => void;
}

export default function WarehouseDetailHeader({
  warehouse,
  onBack,
  onEdit,
}: WarehouseDetailHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 2, sm: 0 },
        pt: 1,
        mb: 4,
      }}
    >
      <Box
        sx={{ display: "flex", gap: { xs: 1.5, sm: 2 }, alignItems: "center" }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            bgcolor: "#FFFFFF",
            border: "1px solid #EBEBEB",
            width: 36,
            height: 36,
            borderRadius: "50%",
            "&:hover": { bgcolor: "#F7F7F9" },
          }}
        >
          <ArrowBackIcon sx={{ color: "#222222", fontSize: 18 }} />
        </IconButton>

        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#222222",
              letterSpacing: "-0.3px",
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
            }}
          >
            {warehouse.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
              mt: 0.5,
            }}
          >
            <Chip
              label={warehouse.status}
              sx={{
                bgcolor: "#F0FDF4",
                color: "#047857",
                fontWeight: 700,
                borderRadius: 1.5,
                height: 20,
                fontSize: "0.65rem",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#717171",
                display: "flex",
                alignItems: "center",
                gap: 0.4,
                fontWeight: 600,
              }}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: 14 }} /> {warehouse.city}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#717171",
                display: "flex",
                alignItems: "center",
                gap: 0.4,
                fontWeight: 600,
              }}
            >
              <PersonOutlineOutlinedIcon sx={{ fontSize: 14 }} />{" "}
              {warehouse.manager}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Button
          onClick={onEdit}
          startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            color: "#222222",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            textDecoration: "underline",
            "&:hover": { bgcolor: "transparent" },
          }}
        >
          Düzenle
        </Button>
      </Box>
    </Box>
  );
}
