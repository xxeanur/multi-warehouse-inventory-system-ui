"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";

import { productService } from "@/services/definitions/productService";
import { categoryService } from "@/services/definitions/categoryService";
import { supplierService } from "@/services/definitions/supplierService";
import { CategoryDto } from "@/types/definitions/category";
import { SupplierDto } from "@/types/definitions/supplier";
import { ProductData } from "@/app/(main)/products/page";
import { UnitType } from "@/types/definitions/product";

import BarcodeScannerModal from "@/components/count/BarcodeScannerModal";

import ProductBasicInfo from "./form/ProductBasicInfo";
import ProductPricing from "./form/ProductPricing";
import ProductPhysical from "./form/ProductPhysical";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productToEdit?: ProductData | null;
}

export default function AddProductModal({
  open,
  onClose,
  onSuccess,
  productToEdit,
}: AddProductModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
  const [isFetchingDropdowns, setIsFetchingDropdowns] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const defaultFormState = {
    name: "",
    sku: "",
    barcode: "",
    brand: "",
    categoryId: "",
    supplierId: "",
    width: "",
    height: "",
    depth: "",
    weight: "",
    criticalLevel: "",
    unitPrice: "",
    costPrice: "",
    unit: UnitType.Piece,
  };

  const [formData, setFormData] = useState(defaultFormState);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#172C4A" },
      "&.Mui-focused fieldset": { borderColor: "#172C4A", borderWidth: "2px" },
    },
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#172C4A" },
  };

  useEffect(() => {
    if (open) {
      const fetchDropdownData = async () => {
        setIsFetchingDropdowns(true);
        try {
          const [catData, supData] = await Promise.all([
            categoryService.getAllAsync(),
            supplierService.getAllAsync(),
          ]);
          setCategories(catData || []);
          setSuppliers(supData || []);
        } catch (error) {
          console.error("Data fetch error:", error);
        } finally {
          setIsFetchingDropdowns(false);
        }
      };
      void fetchDropdownData();
    }
  }, [open]);

  useEffect(() => {
    if (open && productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        sku: productToEdit.sku || "",
        barcode:
          (productToEdit as ProductData & { barcode?: string }).barcode || "",
        brand: productToEdit.brand || "",
        categoryId: productToEdit.categoryId || "",
        supplierId: productToEdit.supplierId || "",
        width: productToEdit.width?.toString() || "",
        height: productToEdit.height?.toString() || "",
        depth: productToEdit.depth?.toString() || "",
        weight: productToEdit.weight?.toString() || "",
        criticalLevel: productToEdit.criticalLevel?.toString() || "",
        unitPrice: productToEdit.unitPrice?.toString() || "",
        costPrice: productToEdit.costPrice?.toString() || "",
        unit:
          productToEdit.unit !== undefined
            ? productToEdit.unit
            : UnitType.Piece,
      });
    } else if (open && !productToEdit) {
      setFormData(defaultFormState);
    }
  }, [open, productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCameraScan = (decodedText: string) => {
    setFormData({ ...formData, barcode: decodedText });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      sku: formData.sku,
      barcode: formData.barcode || formData.sku,
      brand: formData.brand || "Standart",
      width: Number(formData.width) || 0,
      height: Number(formData.height) || 0,
      depth: Number(formData.depth) || 0,
      weight: Number(formData.weight) || 0,
      criticalLevel: Number(formData.criticalLevel) || 0,
      unit: Number(formData.unit) as UnitType,
      unitPrice: Number(formData.unitPrice) || 0,
      costPrice: Number(formData.costPrice) || 0,
      imageUrl: "",
      categoryId: formData.categoryId,
      supplierId:
        formData.supplierId ||
        (suppliers[0]?.id ?? "00000000-0000-0000-0000-000000000000"),
    };

    if (productToEdit)
      await productService.updateAsync({ ...payload, id: productToEdit.id });
    else await productService.createAsync(payload);

    onSuccess();
    onClose();
  };

  const isEditMode = !!productToEdit;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isMobile}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: 600,
              borderRadius: { xs: 0, sm: 3 },
              p: { xs: 1, sm: 2 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: "#F3F4F6",
                p: 1,
                borderRadius: 2,
                color: "#172C4A",
                display: "flex",
              }}
            >
              <ViewInArOutlinedIcon />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              {isEditMode ? "Ürünü Güncelle" : "Yeni Ürün Ekle"}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{ color: "#9CA3AF", bgcolor: "#F9FAFB" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ borderBottom: "none", borderColor: "#E5E7EB" }}
        >
          {isFetchingDropdowns ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress sx={{ color: "#172C4A" }} />
            </Box>
          ) : (
            <Box
              component="form"
              id="addProductForm"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2.5}>
                {/* 1. Temel Bilgiler Bileşeni */}
                <ProductBasicInfo
                  formData={formData}
                  handleChange={handleChange}
                  categories={categories}
                  suppliers={suppliers}
                  onOpenScanner={() => setIsScannerOpen(true)}
                  inputStyle={inputStyle}
                />

                {/* 2. Fiyatlandırma Bileşeni */}
                <ProductPricing
                  formData={formData}
                  handleChange={handleChange}
                  inputStyle={inputStyle}
                />

                {/* 3. Fiziksel Özellikler Bileşeni */}
                <ProductPhysical
                  formData={formData}
                  handleChange={handleChange}
                  inputStyle={inputStyle}
                />
              </Grid>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "#6B7280",
              borderColor: "#D1D5DB",
              "&:hover": { bgcolor: "#F9FAFB", borderColor: "#9CA3AF" },
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            İptal
          </Button>
          <Button
            type="submit"
            form="addProductForm"
            variant="contained"
            disableElevation
            disabled={isFetchingDropdowns}
            sx={{
              bgcolor: "#172C4A",
              "&:hover": { bgcolor: "#0F1D33" },
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
            }}
          >
            {isEditMode ? "Güncelle" : "Ürünü Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      <BarcodeScannerModal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleCameraScan}
      />
    </>
  );
}
