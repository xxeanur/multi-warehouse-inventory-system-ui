import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export default function RestApiSettingsCard() {
  const inputStyle: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": { fontSize: "0.9rem" },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        p: { xs: 2.5, md: 4 },
        bgcolor: "#FFFFFF",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: "#111827",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ApiOutlinedIcon sx={{ color: "#4F46E5" }} /> REST API Erişimi
        </Typography>
        <Chip
          label="Aktif"
          size="small"
          sx={{
            bgcolor: "#F0FDF4",
            color: "#059669",
            fontWeight: 700,
            borderRadius: 1.5,
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{ color: "#6B7280", display: "block", mb: 3 }}
      >
        Dış uygulamaların (ERP, CRM) sistemdeki stok verilerine okuma/yazma
        erişimi yapması için gereken Master API Key.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Master API Key"
            defaultValue="sk_live_51Nx8m4Kp9WmsSystemSecretToken"
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <ContentCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={inputStyle}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="İzin Verilen IP Adresleri (Whitelist)"
            placeholder="Örn: 192.168.1.1, 10.0.0.5"
            sx={inputStyle}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
          >
            API Anahtarını Yenile (Rotate Key)
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
