import { Box, Typography, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface UsersHeaderProps {
  onAddUserClick: () => void;
  isStaff: boolean; 
}

export default function UsersHeader({ onAddUserClick, isStaff }: UsersHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}
        >
          Kullanıcı Yönetimi
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          Sistemdeki personellerin yetkilerini ve hesap durumlarını yönetin.
        </Typography>
      </Box>

      {!isStaff && (
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={onAddUserClick}
          sx={{
            bgcolor: "#172C4A",
            "&:hover": { bgcolor: "#0F1D33" },
            py: 1.2,
            px: 3,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Yeni Kullanıcı Ekle
        </Button>
      )}
    </Box>
  );
}