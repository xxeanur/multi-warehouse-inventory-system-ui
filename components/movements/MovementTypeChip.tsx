import { Chip } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

export default function MovementTypeChip({ type }: { type: string }) {
  switch (type) {
    case "GİRİŞ":
      return (
        <Chip
          label="GİRİŞ"
          size="small"
          icon={<ArrowDownwardIcon style={{ fontSize: 14 }} />}
          sx={{
            bgcolor: "#D1FAE5",
            color: "#065F46",
            fontWeight: 700,
            borderRadius: 1.5,
          }}
        />
      );
    case "ÇIKIŞ":
      return (
        <Chip
          label="ÇIKIŞ"
          size="small"
          icon={<ArrowUpwardIcon style={{ fontSize: 14 }} />}
          sx={{
            bgcolor: "#FEE2E2",
            color: "#991B1B",
            fontWeight: 700,
            borderRadius: 1.5,
          }}
        />
      );
    case "TRANSFER":
      return (
        <Chip
          label="TRANSFER"
          size="small"
          icon={<SyncAltIcon style={{ fontSize: 14 }} />}
          sx={{
            bgcolor: "#E0E7FF",
            color: "#3730A3",
            fontWeight: 700,
            borderRadius: 1.5,
          }}
        />
      );
    default:
      return null;
  }
}
