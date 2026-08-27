"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
  Divider,
  CircularProgress,
  Autocomplete,
  IconButton,
  Tooltip,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LocalPlayOutlinedIcon from "@mui/icons-material/LocalPlayOutlined";

import { WarehouseDto } from "@/types/definitions/warehouse";
import { ShelfDto } from "@/types/definitions/shelf";
import { WarehouseZoneDto } from "@/types/definitions/warehouseZone";
import { ProductDto } from "@/types/definitions/product";

import { notifyError, notifySuccess } from "@/lib/notificationService";
import { productService } from "@/services/definitions/productService";
import BarcodeScannerModal from "./BarcodeScannerModal";

interface InventoryCountFormProps {
  warehouses: WarehouseDto[];
  zones: WarehouseZoneDto[];
  shelves: ShelfDto[];
  onWarehouseChange: (warehouseId: string) => void;
  onZoneChange: (zoneId: string) => void;
  onSubmit: (data: {
    warehouseId: string;
    shelfId: string;
    productId: string;
    quantity: number;
  }) => void;
  isSubmitting: boolean;
}

export default function InventoryCountForm({
  warehouses,
  zones,
  shelves,
  onWarehouseChange,
  onZoneChange,
  onSubmit,
  isSubmitting,
}: InventoryCountFormProps) {
  const [barcode, setBarcode] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null,
  );
  const [quantity, setQuantity] = useState<number | string>("");

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSearchingBarcode, setIsSearchingBarcode] = useState(false);

  // Async Autocomplete State'leri
  const [searchQuery, setSearchQuery] = useState("");
  const [productOptions, setProductOptions] = useState<ProductDto[]>([]);
  const [isSearchingAsync, setIsSearchingAsync] = useState(false);

  // Focus State'i
  const [focusTrigger, setFocusTrigger] = useState<
    "barcode" | "quantity" | null
  >(null);

  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "1px" },
    },
    "& .MuiInputBase-input": { fontSize: { xs: "0.85rem", md: "1rem" } },
    "& .MuiInputLabel-root": { fontSize: { xs: "0.85rem", md: "1rem" } },
  };

  useEffect(() => {
    if (focusTrigger === "quantity") {
      quantityInputRef.current?.focus();
      setFocusTrigger(null);
    } else if (focusTrigger === "barcode") {
      barcodeInputRef.current?.focus();
      setFocusTrigger(null);
    }
  }, [focusTrigger]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setProductOptions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearchingAsync(true);
      try {
        const results = await productService.searchAsync(searchQuery);
        setProductOptions(results);
      } catch {
        setProductOptions([]);
      } finally {
        setIsSearchingAsync(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wId = e.target.value;
    setSelectedWarehouse(wId);
    setSelectedZone("");
    setSelectedShelf("");
    onWarehouseChange(wId);
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zId = e.target.value;
    setSelectedZone(zId);
    setSelectedShelf("");
    onZoneChange(zId);
  };

  const processBarcode = async (scannedCode: string) => {
    if (!scannedCode.trim()) return;

    setIsSearchingBarcode(true);
    try {
      const foundProduct = await productService.getBySkuAsync(
        scannedCode.trim(),
      );

      setSelectedProduct(foundProduct);
      setProductOptions([foundProduct]);
      notifySuccess(`${foundProduct.name} barkod ile bulundu.`);
      setBarcode("");

      setFocusTrigger("quantity");
    } catch {
      setBarcode("");
      setFocusTrigger("barcode");
    } finally {
      setIsSearchingBarcode(false);
    }
  };

  const handleBarcodeKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processBarcode(barcode);
    }
  };

  const handleQuantityKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCameraScan = (decodedText: string) => {
    processBarcode(decodedText);
  };

  const handleSubmit = () => {
    if (
      !selectedWarehouse ||
      !selectedShelf ||
      !selectedProduct ||
      quantity === ""
    ) {
      notifyError(
        "Lütfen Depo, Raf, Ürün ve Miktar alanlarını eksiksiz doldurun.",
      );
      return;
    }

    onSubmit({
      warehouseId: selectedWarehouse,
      shelfId: selectedShelf,
      productId: selectedProduct.id,
      quantity: Number(quantity),
    });

    setQuantity("");
    setSelectedProduct(null);
    setFocusTrigger("barcode");
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "#172C4A",
          fontWeight: 700,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <LocalPlayOutlinedIcon /> Hızlı Fiziki Sayım Girişi
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          fullWidth
          label="Barkod / QR Kod Okut"
          placeholder="Terminalle okutun veya kamerayı açın"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleBarcodeKeyDown}
          disabled={isSearchingBarcode || isSubmitting}
          inputRef={barcodeInputRef}
          sx={inputStyle}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {isSearchingBarcode ? (
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                  ) : null}
                  <Tooltip title="Kamerayla Okut">
                    {/* Sadece tek, işlevsel ve şık bir ikon bırakıyoruz */}
                    <IconButton
                      onClick={() => setIsScannerOpen(true)}
                      edge="end"
                      sx={{ color: "#172C4A" }}
                    >
                      <QrCodeScannerIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />

        <Divider sx={{ my: 0.5 }}>
          <Typography
            variant="caption"
            sx={{ color: "#9CA3AF", fontWeight: 600, letterSpacing: 0.5 }}
          >
            ÖNCE LOKASYONU SEÇİN
          </Typography>
        </Divider>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Depo"
              value={selectedWarehouse}
              onChange={handleWarehouseChange}
              sx={inputStyle}
            >
              {warehouses.map((w) => (
                <MenuItem key={w.id} value={w.id}>
                  {w.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Alan (Zone)"
              value={selectedZone}
              onChange={handleZoneChange}
              disabled={!selectedWarehouse}
              sx={inputStyle}
            >
              {zones.map((z) => (
                <MenuItem key={z.id} value={z.id}>
                  {z.zoneName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Bulunduğu Raf"
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
              disabled={!selectedZone}
              sx={inputStyle}
            >
              {shelves.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.shelfNumber}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ position: "relative" }}>
          <Autocomplete
            options={productOptions}
            getOptionLabel={(option) => `${option.name} (${option.sku})`}
            value={selectedProduct}
            onChange={(_event, newValue) => {
              setSelectedProduct(newValue);
            }}
            onInputChange={(_event, newInputValue) => {
              setSearchQuery(newInputValue);
            }}
            disabled={isSearchingBarcode}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ürün Ara (Manuel)"
                placeholder="Ürün adını veya kodunu yazın..."
                sx={inputStyle}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {option.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>
                    {option.sku}
                  </Typography>
                </Box>
              </li>
            )}
            noOptionsText="Ürün bulunamadı"
          />

          {isSearchingAsync && (
            <CircularProgress
              size={20}
              sx={{
                position: "absolute",
                right: 40,
                top: "50%",
                marginTop: "-10px",
                color: "#172C4A",
                pointerEvents: "none",
              }}
            />
          )}
        </Box>

        <TextField
          fullWidth
          label="Sayılan Miktar"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={handleQuantityKeyDown}
          inputRef={quantityInputRef}
          disabled={isSubmitting}
          sx={inputStyle}
          slotProps={{ htmlInput: { min: 0 } }}
        />

        <Button
          variant="contained"
          fullWidth
          disableElevation
          onClick={handleSubmit}
          disabled={isSubmitting}
          startIcon={
            isSubmitting && <CircularProgress size={20} color="inherit" />
          }
          sx={{
            bgcolor: "#172C4A",
            "&:hover": { bgcolor: "#0F1D33" },
            py: 1.8,
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 2,
            textTransform: "none",
            mt: 1,
          }}
        >
          {isSubmitting ? "Kaydediliyor..." : "Sayımı Listeye Ekle (Kaydet)"}
        </Button>
      </Box>

      <BarcodeScannerModal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleCameraScan}
      />
    </Card>
  );
}
