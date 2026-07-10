import { Box, Card, Typography, Grid, TextField, Button, Chip, Divider } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";

export default function BackupSettingsCard() {
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
        borderRadius: 3, border: "1px solid #E5E7EB", p: { xs: 2.5, md: 4 },
        bgcolor: "#FFFFFF", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111827", display: "flex", alignItems: "center", gap: 1 }}>
          <StorageOutlinedIcon sx={{ color: "#2563EB" }} /> Veritabanı Yedekleme
        </Typography>
        <Chip label="Bulut Senkronize" icon={<CloudSyncOutlinedIcon fontSize="small" />} size="small" sx={{ bgcolor: "#EFF6FF", color: "#2563EB", fontWeight: 700, borderRadius: 1.5, "& .MuiChip-icon": { color: "#2563EB" } }} />
      </Box>
      <Typography variant="caption" sx={{ color: "#6B7280", display: "block", mb: 3 }}>
        Stok hareketlerinin ve kullanıcı veritabanının otomatik yedekleme periyotları. (Amazon S3 bucket bağlantısı aktiftir).
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Otomatik Yedekleme Sıklığı" select slotProps={{ select: { native: true } }} sx={inputStyle}>
            <option>Her Gece (03:00)</option>
            <option>Haftalık (Pazar Gecesi)</option>
            <option>Sadece Manuel</option>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1, borderColor: "#F3F4F6" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
                Son Başarılı Yedekleme
              </Typography>
              <Typography variant="caption" sx={{ color: "#059669" }}>
                Bugün 03:05 • wms_backup_120726.sql.gz
              </Typography>
            </Box>
            <Button variant="contained" sx={{ bgcolor: "#2563EB", "&:hover": { bgcolor: "#1D4ED8" }, fontWeight: 600, borderRadius: 2, textTransform: "none", boxShadow: "none" }}>
              Şimdi Yedekle
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}