import { Card, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";

export default function ActiveSessionsCard() {
  const sectionCardStyle = {
    borderRadius: 3,
    border: "1px solid #E5E7EB",
    p: { xs: 2.5, md: 4 },
    bgcolor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
  };

  return (
    <Card elevation={0} sx={sectionCardStyle}>
      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#111827", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <KeyOutlinedIcon fontSize="small" sx={{ color: "#6B7280" }} /> Aktif Oturumlar
      </Typography>
      <List sx={{ p: 0 }}>
        <ListItem sx={{ px: 0, py: 1.5, borderBottom: "1px solid #F3F4F6" }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ComputerOutlinedIcon sx={{ color: "#059669" }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>Windows PC - Chrome</Typography>}
            secondary={<Typography variant="caption" sx={{ color: "#6B7280" }}>Şu an aktif • Konya, TR</Typography>}
          />
        </ListItem>
        <ListItem sx={{ px: 0, py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PhoneIphoneOutlinedIcon sx={{ color: "#6B7280" }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>iPhone 13 - Safari</Typography>}
            secondary={<Typography variant="caption" sx={{ color: "#6B7280" }}>Dün 14:30 • Konya, TR</Typography>}
          />
          <Button size="small" color="error" sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem" }}>
            Kapat
          </Button>
        </ListItem>
      </List>
    </Card>
  );
}