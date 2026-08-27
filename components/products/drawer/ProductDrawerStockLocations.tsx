import { Box, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { ProductData } from "@/app/(main)/products/page";

interface Props {
  locations: ProductData["stockLocations"];
  unitName: string;
}

export default function ProductDrawerStockLocations({ locations, unitName }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
      {locations && locations.length > 0 ? (
        locations.map((loc, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#F9FAFB", p: 1.5, borderRadius: 2, border: "1px solid #E5E7EB" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LocationOnOutlinedIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#374151" }}>{loc.warehouseName}</Typography>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>Raf: {loc.shelfName}</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 800, color: "#172C4A" }}>
              {loc.quantity} {unitName}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: "#6B7280", fontStyle: "italic", p: 2, textAlign: "center", bgcolor: "#F9FAFB", borderRadius: 2 }}>
          Bu ürüne ait herhangi bir stok kaydı bulunmamaktadır.
        </Typography>
      )}
    </Box>
  );
}