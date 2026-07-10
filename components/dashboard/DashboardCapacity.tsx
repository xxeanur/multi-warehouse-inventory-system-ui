import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";

export default function DashboardCapacity() {
  const cardStyle = {
    borderRadius: 3,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
    border: "1px solid #E5E7EB",
    height: "100%",
  };

  return (
    <Card
      elevation={0}
      sx={{ ...cardStyle, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid #E5E7EB" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "#111827" }}
        >
          Kapasite Kullanımı
        </Typography>
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {/* Ankara */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#374151" }}
            >
              Ankara İç Anadolu Hub
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#DC2626" }}
            >
              %94
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={94}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "#FEE2E2",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#DC2626",
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {/* Konya */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#374151" }}
            >
              Konya Merkez Depo
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#F59E0B" }}
            >
              %80
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={80}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "#FEF3C7",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#F59E0B",
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {/* İstanbul */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#374151" }}
            >
              İstanbul Avrupa Transfer
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#059669" }}
            >
              %60
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={60}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "#D1FAE5",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#059669",
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
