"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  IconButton,
  Chip,
  Divider,
  Stack,
  useMediaQuery,
  TextField,
  InputAdornment,
  MenuItem,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LayoutWrapper from "../../components/LayoutWrapper";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined"; // Kutulu modern ikon
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import AddProductModal from "../../components/products/AddProductModal";

// Sahte (mock) ürün verileri
const mockProducts = [
  {
    id: 1,
    sku: "SKU-1001",
    name: "MacBook Pro M3",
    category: "Elektronik",
    warehouse: "Merkez Depo",
    volume: "1200 cm³",
    criticalLevel: 10,
    totalStock: 45,
  },
  {
    id: 2,
    sku: "SKU-1002",
    name: "Dell UltraSharp Monitör",
    category: "Elektronik",
    warehouse: "Konya Şube",
    volume: "8500 cm³",
    criticalLevel: 5,
    totalStock: 15,
  },
  {
    id: 3,
    sku: "SKU-2055",
    name: "Ergonomik Ofis Koltuğu",
    category: "Mobilya",
    warehouse: "Merkez Depo",
    volume: "45000 cm³",
    criticalLevel: 20,
    totalStock: 18, // 18 <= 20 olduğu için Kritik
  },
  {
    id: 4,
    sku: "SKU-3012",
    name: "Type-C Çoklayıcı Hub",
    category: "Aksesuar",
    warehouse: "Konya Şube",
    volume: "150 cm³",
    criticalLevel: 50,
    totalStock: 120,
  },
  {
    id: 5,
    sku: "SKU-1088",
    name: "Logitech MX Master 3",
    category: "Aksesuar",
    warehouse: "Merkez Depo",
    volume: "400 cm³",
    criticalLevel: 15,
    totalStock: 8, // 8 <= 15 olduğu için Kritik
  },
];

export default function ProductsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof mockProducts)[0] | null
  >(null);

  // Filtreleme State'leri
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedWarehouse, setSelectedWarehouse] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL"); // YENİ: Durum filtresi

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleRowClick = (product: (typeof mockProducts)[0]) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Dinamik Filtreleme Mantığı (4'lü Kombinasyon)
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;

    const matchesWarehouse =
      selectedWarehouse === "ALL" || product.warehouse === selectedWarehouse;

    // Stok durumu hesaplaması
    const isCritical = product.totalStock <= product.criticalLevel;
    const productStatus = isCritical ? "Kritik" : "Yeterli";
    const matchesStatus =
      selectedStatus === "ALL" || productStatus === selectedStatus;

    return (
      matchesSearch && matchesCategory && matchesWarehouse && matchesStatus
    );
  });

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": { fontSize: { xs: "0.85rem", md: "0.95rem" } },
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 3, md: 0 },
          pb: 4,
          overflowX: "hidden",
        }}
      >
        {/* Üst Kısım: Başlık ve Ekle Butonu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 4,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#111827",
                mb: 0.5,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Ürün Yönetimi
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6B7280",
                fontSize: { xs: "0.8rem", md: "0.875rem" },
              }}
            >
              Sistemde kayıtlı tüm ürünleri ve stok durumlarını yönetin
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            onClick={() => setIsModalOpen(true)}
            sx={{
              bgcolor: "#172C4A",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              width: { xs: "100%", sm: "auto" },
              "&:hover": { bgcolor: "#0F1D33" },
            }}
          >
            Yeni Ürün
          </Button>
        </Box>

        {/* GELİŞMİŞ FİLTRELEME ÇUBUĞU */}
        <Card
          elevation={0}
          sx={{
            p: { xs: 2, md: 2.5 },
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            mb: 3,
          }}
        >
          <Grid container spacing={2}>
            {/* Arama Kutusu */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ürün veya SKU ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={inputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon
                          sx={{ color: "#9CA3AF", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            {/* Kategori Filtresi */}
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Kategori"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={inputStyle}
              >
                <MenuItem value="ALL">Tüm Kategoriler</MenuItem>
                <MenuItem value="Elektronik">Elektronik</MenuItem>
                <MenuItem value="Mobilya">Mobilya</MenuItem>
                <MenuItem value="Aksesuar">Aksesuar</MenuItem>
              </TextField>
            </Grid>
            {/* Depo Filtresi */}
            <Grid size={{ xs: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Depo"
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                sx={inputStyle}
              >
                <MenuItem value="ALL">Tüm Depolar</MenuItem>
                <MenuItem value="Merkez Depo">Merkez Depo</MenuItem>
                <MenuItem value="Konya Şube">Konya Şube</MenuItem>
              </TextField>
            </Grid>
            {/* Durum Filtresi (YENİ) */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Stok Durumu"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={inputStyle}
              >
                <MenuItem value="ALL">Tüm Durumlar</MenuItem>
                <MenuItem value="Yeterli">Stok Yeterli</MenuItem>
                <MenuItem value="Kritik">Kritik Seviye</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Card>

        {/* Veri Listeleme Alanı */}
        {isMobile ? (
          <Stack spacing={2}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((row) => (
                <Card
                  key={row.id}
                  elevation={0}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                    "&:active": { bgcolor: "#F9FAFB" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "#111827",
                        }}
                      >
                        {row.name}
                      </Typography>
                      <Typography
                        sx={{ color: "#6B7280", fontSize: "0.75rem", mt: 0.2 }}
                      >
                        {row.sku} • {row.category}
                      </Typography>
                    </Box>
                    {row.totalStock <= row.criticalLevel ? (
                      <Chip
                        label="Kritik"
                        size="small"
                        sx={{
                          bgcolor: "#FEF2F2",
                          color: "#DC2626",
                          fontWeight: 600,
                          borderRadius: 1.5,
                          fontSize: "0.7rem",
                        }}
                      />
                    ) : (
                      <Chip
                        label="Yeterli"
                        size="small"
                        sx={{
                          bgcolor: "#D1FAE5",
                          color: "#065F46",
                          fontWeight: 600,
                          borderRadius: 1.5,
                          fontSize: "0.7rem",
                        }}
                      />
                    )}
                  </Box>
                  <Divider sx={{ my: 1, borderStyle: "dashed" }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>
                      Depo: <strong>{row.warehouse}</strong>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#111827",
                        fontWeight: 700,
                      }}
                    >
                      Stok: {row.totalStock}
                    </Typography>
                  </Box>
                </Card>
              ))
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#6B7280",
                  py: 4,
                  fontSize: "0.875rem",
                }}
              >
                Aradığınız kriterlere uygun ürün bulunamadı.
              </Typography>
            )}
          </Stack>
        ) : (
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: "#FAFAFA" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                      Stok Kodu (SKU)
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                      Ürün Adı
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                      Kategori
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                      Depo
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, color: "#4B5563" }}
                      align="center"
                    >
                      Toplam Stok
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, color: "#4B5563" }}
                      align="right"
                    >
                      Durum
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        onClick={() => handleRowClick(row)}
                        sx={{
                          cursor: "pointer",
                          "&:last-child td, &:last-child th": { border: 0 },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500, color: "#374151" }}>
                          {row.sku}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#111827" }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ color: "#6B7280" }}>
                          {row.category}
                        </TableCell>
                        <TableCell sx={{ color: "#6B7280" }}>
                          {row.warehouse}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontWeight: 700,
                            color: "#111827",
                            fontSize: "1rem",
                          }}
                        >
                          {row.totalStock}
                        </TableCell>
                        <TableCell align="right">
                          {row.totalStock <= row.criticalLevel ? (
                            <Chip
                              label="Kritik"
                              size="small"
                              sx={{
                                bgcolor: "#FEF2F2",
                                color: "#DC2626",
                                fontWeight: 600,
                                borderRadius: 1.5,
                                px: 0.5,
                              }}
                            />
                          ) : (
                            <Chip
                              label="Yeterli"
                              size="small"
                              sx={{
                                bgcolor: "#D1FAE5",
                                color: "#065F46",
                                fontWeight: 600,
                                borderRadius: 1.5,
                                px: 0.5,
                              }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="center"
                        sx={{ py: 6, color: "#6B7280" }}
                      >
                        <Typography variant="body2">
                          Aradığınız kriterlere uygun ürün bulunamadı.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {/* Sağdan Açılan Ürün Detay Paneli (Drawer) */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={closeDrawer}
          sx={{ zIndex: 1300 }}
          slotProps={{
            paper: {
              sx: {
                width: { xs: "100%", sm: 420 },
                bgcolor: "#FFFFFF",
              },
            },
          }}
        >
          {selectedProduct && (
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {/* 1. SABİT BAŞLIK (HEADER) */}
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexShrink: 0,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "#F3F4F6",
                      p: 1.5,
                      borderRadius: 2,
                      color: "#172C4A",
                      display: "flex",
                    }}
                  >
                    <ViewInArOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                        lineHeight: 1.2,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {selectedProduct.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6B7280" }}>
                      {selectedProduct.sku}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={closeDrawer}
                  size="small"
                  sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* 2. KAYDIRILABİLİR İÇERİK (BODY) */}
              <Box
                sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2.5, md: 3 } }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#9CA3AF",
                    mb: 2,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    fontSize: "0.75rem",
                  }}
                >
                  ÜRÜN ÖZELLİKLERİ
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#F9FAFB",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
                    >
                      Kategori
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#111827" }}
                    >
                      {selectedProduct.category}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#F9FAFB",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", display: "block", mb: 0.5 }}
                    >
                      Bulunduğu Depo
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#111827" }}
                    >
                      {selectedProduct.warehouse}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#FEF2F2",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #FECACA",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "#991B1B", display: "block", mb: 0.5 }}
                    >
                      Kritik Seviye
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#DC2626" }}
                    >
                      {selectedProduct.criticalLevel} Adet
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#F0FDF4",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #BBF7D0",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "#166534", display: "block", mb: 0.5 }}
                    >
                      Toplam Stok
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#15803D" }}
                    >
                      {selectedProduct.totalStock} Adet
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* 3. SABİT ALT ÇUBUK (FOOTER) */}
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderTop: "1px solid #E5E7EB",
                  bgcolor: "#FAFAFA",
                  flexShrink: 0,
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    sx={{
                      color: "#DC2626",
                      borderColor: "#DC2626",
                      "&:hover": { bgcolor: "#FEF2F2", borderColor: "#DC2626" },
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Sil
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<EditOutlinedIcon />}
                    disableElevation
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                      bgcolor: "#172C4A",
                      "&:hover": { bgcolor: "#0F1D33" },
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    Düzenle
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Drawer>
        <AddProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Box>
    </LayoutWrapper>
  );
}
