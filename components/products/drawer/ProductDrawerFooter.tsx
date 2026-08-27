import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
}

export default function ProductDrawerFooter({ onDelete, onEdit }: Props) {
  return (
    <Box sx={{ p: { xs: 2.5, md: 3 }, borderTop: "1px solid #E5E7EB", bgcolor: "#FAFAFA", flexShrink: 0 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" fullWidth startIcon={<DeleteOutlineOutlinedIcon />} onClick={onDelete} sx={{ color: "#DC2626", borderColor: "#DC2626", "&:hover": { bgcolor: "#FEF2F2", borderColor: "#DC2626" }, textTransform: "none", borderRadius: 2, fontWeight: 600 }}>Sil</Button>
        <Button variant="contained" fullWidth startIcon={<EditOutlinedIcon />} disableElevation onClick={onEdit} sx={{ bgcolor: "#172C4A", "&:hover": { bgcolor: "#0F1D33" }, textTransform: "none", borderRadius: 2, fontWeight: 600 }}>Düzenle</Button>
      </Box>
    </Box>
  );
}