"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LayoutWrapper from "@/components/LayoutWrapper";
import InboundOrderHeaderForm from "@/components/documents/inbound/InboundOrderHeaderForm";
import InboundOrderLinesForm, {
  LineItemState,
} from "@/components/documents/inbound/InboundOrderLinesForm";

import { inboundService } from "@/services/documents/inboundService";
import { supplierService } from "@/services/definitions/supplierService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { productService } from "@/services/definitions/productService";

import { SupplierDto } from "@/types/definitions/supplier";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { ProductDto } from "@/types/definitions/product";
import { InboundOrderCreateDto, MovementType } from "@/types/documents/inbound";
import { notifyError, notifySuccess } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext";

export default function CreateInboundOrderPage() {
  const router = useRouter();
  const { confirm } = useConfirm();

  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State'leri
  const [warehouseId, setWarehouseId] = useState<string>("");
  const [supplierId, setSupplierId] = useState<string>("");
  const [movementType, setMovementType] = useState<number>(
    MovementType.Inbound,
  );
  const [description, setDescription] = useState<string>("");
  const [lines, setLines] = useState<LineItemState[]>([
    { id: crypto.randomUUID(), productId: "", expectedQuantity: 1 },
  ]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      supplierService.getAllAsync(),
      warehouseService.getAllAsync(),
      productService.getAllAsync(),
    ])
      .then(([suppliersData, warehousesData, productsData]) => {
        if (isMounted) {
          setSuppliers(suppliersData);
          setWarehouses(warehousesData);
          setProducts(productsData);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingData(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = () => {
    if (!warehouseId) {
      notifyError("Lütfen hedef depoyu seçin.");
      return;
    }

    const validLines = lines.filter(
      (l) => l.productId && Number(l.expectedQuantity) > 0,
    );
    if (validLines.length === 0) {
      notifyError("Lütfen en az bir geçerli ürün ve miktar girin.");
      return;
    }

    const createDto: InboundOrderCreateDto = {
      warehouseId,
      supplierId: supplierId || null,
      movementType,
      description,
      lines: validLines.map((l) => ({
        productId: l.productId,
        expectedQuantity: Number(l.expectedQuantity),
      })),
    };

    setIsSubmitting(true);
    inboundService
      .createAsync(createDto)
      .then(() => {
        notifySuccess("Fiş başarıyla oluşturuldu.");
        router.push("/documents/inbound");
      })
      .catch(() => setIsSubmitting(false));
  };

  const handleCancelSafe = async () => {
    const hasChanges =
      warehouseId !== "" ||
      supplierId !== "" ||
      description !== "" ||
      lines[0].productId !== "";

    if (hasChanges) {
      const isConfirmed = await confirm({
        title: "Çıkmak İstediğinize Emin Misiniz?",
        description: "Kaydedilmemiş form verileriniz kaybolacaktır.",
        confirmText: "Evet, Çık",
        cancelText: "Vazgeç",
      });
      if (!isConfirmed) return;
    }
    router.back();
  };

  if (loadingData) {
    return (
      <LayoutWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress sx={{ color: "#172C4A" }} />
        </Box>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            maxWidth: "1000px",
            margin: "0 auto",
            px: { xs: 2, sm: 4 },
            pb: 8,
            pt: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
            <IconButton
              onClick={handleCancelSafe}
              sx={{
                bgcolor: "#F3F4F6",
                "&:hover": { bgcolor: "#E5E7EB" },
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <ArrowBackIcon sx={{ color: "#172C4A" }} />
            </IconButton>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}
              >
                Yeni Mal Kabul Fişi
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                Depoya giriş yapacak ürünler için oluşturulan fiş (Inbound
                Order).
              </Typography>
            </Box>
          </Box>

          <InboundOrderHeaderForm
            warehouseId={warehouseId}
            setWarehouseId={setWarehouseId}
            supplierId={supplierId}
            setSupplierId={setSupplierId}
            movementType={movementType}
            setMovementType={setMovementType}
            description={description}
            setDescription={setDescription}
            warehouses={warehouses}
            suppliers={suppliers}
          />

          <InboundOrderLinesForm
            lines={lines}
            setLines={setLines}
            products={products}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
              flexDirection: { xs: "column-reverse", sm: "row" },
            }}
          >
            <Button
              onClick={handleCancelSafe}
              variant="outlined"
              disabled={isSubmitting}
              sx={{
                color: "#6B7280",
                borderColor: "#D1D5DB",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
                py: { xs: 1.5, sm: 1 },
                "&:hover": { bgcolor: "#F9FAFB", borderColor: "#9CA3AF" },
              }}
            >
              Vazgeç
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              variant="contained"
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveOutlinedIcon />
                )
              }
              disableElevation
              sx={{
                bgcolor: "#172C4A",
                color: "#FFFFFF",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 5,
                py: { xs: 1.5, sm: 1 },
                "&:hover": { bgcolor: "#0F1D33" },
              }}
            >
              {isSubmitting ? "Oluşturuluyor..." : "Fişi Kaydet"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </LayoutWrapper>
  );
}
