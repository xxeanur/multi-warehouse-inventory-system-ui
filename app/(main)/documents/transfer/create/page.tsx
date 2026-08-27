"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  CircularProgress,
  Fade,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

import LayoutWrapper from "@/components/LayoutWrapper";
import TransferCreateInfoPanel from "@/components/documents/transfer/create/TransferCreateInfoPanel";
import TransferCreateLineItem from "@/components/documents/transfer/create/TransferCreateLineItem";

import { transferService } from "@/services/documents/transferService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { productService } from "@/services/definitions/productService";
import { stockService } from "@/services/inventory/stockService";

import { WarehouseDto } from "@/types/definitions/warehouse";
import { ProductDto } from "@/types/definitions/product";
import { TransferOrderCreateDto } from "@/types/documents/transfer";
import { notifyError, notifySuccess } from "@/lib/notificationService";

// Projendeki yola göre importunu düzenle
import { useConfirm } from "@/contexts/ConfirmContext";

export interface LineItemState {
  id: string;
  productId: string;
  quantity: number | string;
}

export default function CreateTransferOrderPage() {
  const router = useRouter();
  const { confirm } = useConfirm(); // Confirm hook'u eklendi

  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [allProducts, setAllProducts] = useState<ProductDto[]>([]);
  const [availableStocks, setAvailableStocks] = useState<
    Record<string, number>
  >({});

  const [loadingData, setLoadingData] = useState(true);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sourceWarehouseId, setSourceWarehouseId] = useState<string>("");
  const [targetWarehouseId, setTargetWarehouseId] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [lines, setLines] = useState<LineItemState[]>([
    { id: crypto.randomUUID(), productId: "", quantity: 1 },
  ]);

  const primaryColor = "#172C4A";

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "#F9FAFB",
      transition: "0.3s",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: primaryColor },
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
        borderWidth: "2px",
      },
    },
    "& .MuiInputBase-input": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.875rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: primaryColor },
  };

  useEffect(() => {
    let isMounted = true;
    setLoadingData(true);

    Promise.all([warehouseService.getAllAsync(), productService.getAllAsync()])
      .then(([warehousesData, productsData]) => {
        if (isMounted) {
          setWarehouses(warehousesData);
          setAllProducts(productsData);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingData(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sourceWarehouseId) {
      setAvailableStocks({});
      return;
    }

    let isMounted = true;
    setLoadingStocks(true);

    stockService
      .getByWarehouseIdAsync(sourceWarehouseId)
      .then((stocks) => {
        if (!isMounted) return;

        const stockMap: Record<string, number> = {};
        stocks.forEach((s) => {
          const availableQuantity = s.quantity - s.reservedQuantity;
          if (availableQuantity > 0) {
            stockMap[s.productId] =
              (stockMap[s.productId] || 0) + availableQuantity;
          }
        });

        setAvailableStocks(stockMap);
        setLines([{ id: crypto.randomUUID(), productId: "", quantity: 1 }]);
      })
      .finally(() => {
        if (isMounted) setLoadingStocks(false);
      });

    return () => {
      isMounted = false;
    };
  }, [sourceWarehouseId]);

  const handleAddLine = () => {
    setLines([
      ...lines,
      { id: crypto.randomUUID(), productId: "", quantity: 1 },
    ]);
  };

  const handleRemoveLine = (idToRemove: string) => {
    if (lines.length === 1) return;
    setLines(lines.filter((line) => line.id !== idToRemove));
  };

  const handleLineChange = (
    id: string,
    field: keyof LineItemState,
    value: string | number,
  ) => {
    setLines(
      lines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line,
      ),
    );
  };

  const availableProductOptions = allProducts.filter(
    (p) => (availableStocks[p.id] || 0) > 0,
  );

  const handleSubmit = async () => {
    if (!sourceWarehouseId) {
      notifyError("Lütfen çıkış yapılacak (kaynak) depoyu seçin.");
      return;
    }
    if (!targetWarehouseId) {
      notifyError("Lütfen giriş yapılacak (hedef) depoyu seçin.");
      return;
    }
    if (sourceWarehouseId === targetWarehouseId) {
      notifyError("Kaynak depo ile hedef depo aynı olamaz.");
      return;
    }

    const validLines = lines.filter(
      (l) => l.productId && Number(l.quantity) > 0,
    );
    if (validLines.length === 0) {
      notifyError("Lütfen en az bir geçerli ürün ve transfer miktarı girin.");
      return;
    }

    const productIds = validLines.map((l) => l.productId);
    const hasDuplicates = new Set(productIds).size !== productIds.length;
    if (hasDuplicates) {
      notifyError(
        "Aynı ürünü birden fazla satıra ekleyemezsiniz. Lütfen aynı ürünün miktarlarını tek satırda toplayın.",
      );
      return;
    }

    for (const line of validLines) {
      const currentStock = availableStocks[line.productId] || 0;
      if (Number(line.quantity) > currentStock) {
        notifyError(
          `Hata: İstenen miktar, kaynak depodaki kullanılabilir stoktan (${currentStock}) fazla olamaz.`,
        );
        return;
      }
    }

    // YENİ: Confirm Modal eklendi
    const isConfirmed = await confirm({
      title: "Transferi Başlat",
      description:
        "Transfer fişini oluşturmak ve ürünleri rezerve etmek istediğinize emin misiniz?",
      confirmText: "Evet, Başlat",
      cancelText: "Vazgeç",
    });

    if (!isConfirmed) return;

    const createDto: TransferOrderCreateDto = {
      sourceWarehouseId,
      targetWarehouseId,
      description,
      lines: validLines.map((l) => ({
        productId: l.productId,
        quantity: Number(l.quantity),
      })),
    };

    setIsSubmitting(true);

    transferService
      .createAsync(createDto)
      .then(() => {
        notifySuccess(
          "Transfer fişi başarıyla oluşturuldu ve ürünler rezerve edildi.",
        );
        router.push("/documents/transfer");
      })
      .finally(() => setIsSubmitting(false));
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
              onClick={() => router.back()}
              sx={{
                bgcolor: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
                Yeni Depolar Arası Transfer
              </Typography>
            </Box>
          </Box>

          {/* 1. COMPONENT: Başlık Bilgileri */}
          <TransferCreateInfoPanel
            warehouses={warehouses}
            sourceWarehouseId={sourceWarehouseId}
            setSourceWarehouseId={setSourceWarehouseId}
            targetWarehouseId={targetWarehouseId}
            setTargetWarehouseId={setTargetWarehouseId}
            description={description}
            setDescription={setDescription}
            inputStyle={inputStyle}
          />

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              border: "1px solid #E5E7EB",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
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
                  <SwapHorizOutlinedIcon />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#111827" }}
                >
                  Transfer Edilecek Ürünler
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddLine}
                disabled={!sourceWarehouseId}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#172C4A",
                  borderColor: "#E5E7EB",
                }}
              >
                Yeni Satır
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {!sourceWarehouseId ? (
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", textAlign: "center", py: 4 }}
              >
                Ürün seçebilmek için lütfen önce Kaynak Depo seçiniz.
              </Typography>
            ) : loadingStocks ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={30} sx={{ color: "#172C4A" }} />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {lines.map((line, index) => (
                  <TransferCreateLineItem
                    key={line.id}
                    line={line}
                    index={index}
                    availableProductOptions={availableProductOptions}
                    availableStocks={availableStocks}
                    canRemove={lines.length > 1}
                    inputStyle={inputStyle}
                    onChange={handleLineChange}
                    onRemove={handleRemoveLine}
                  />
                ))}
              </Box>
            )}
          </Paper>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
          >
            <Button
              onClick={() => router.back()}
              variant="outlined"
              disabled={isSubmitting}
              sx={{
                color: "#6B7280",
                borderColor: "#D1D5DB",
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
              }}
            >
              Vazgeç
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting || !sourceWarehouseId || !targetWarehouseId
              }
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
                borderRadius: 2,
                fontWeight: 600,
                px: 5,
              }}
            >
              {isSubmitting ? "Oluşturuluyor..." : "Transferi Başlat"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </LayoutWrapper>
  );
}
