"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OutputOutlinedIcon from "@mui/icons-material/OutputOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import LayoutWrapper from "@/components/LayoutWrapper";
import TransferInfoPanel from "@/components/documents/transfer/transfer-detail/TransferInfoPanel";
import TransferPendingLineItem from "@/components/documents/transfer/transfer-detail/TransferPendingLineItem";
import TransferResultTable, {
  DocumentStatus,
} from "@/components/documents/transfer/transfer-detail/TransferResultTable";

import { transferService } from "@/services/documents/transferService";
import {
  TransferOrderDetailDto,
  TransferOrderDispatchDto,
  TransferOrderReceiveDto,
} from "@/types/documents/transfer";
import { notifyError, notifySuccess } from "@/lib/notificationService";

import { useConfirm } from "@/contexts/ConfirmContext";

export default function TransferOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const { confirm } = useConfirm();

  const [order, setOrder] = useState<TransferOrderDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!orderId) return;

    transferService
      .getByIdAsync(orderId)
      .then((orderData) => {
        if (isMounted) setOrder(orderData);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const handleDispatch = async () => {
    if (!order) return;

    const isConfirmed = await confirm({
      title: "Yola Çıkar (Dispatch)",
      description:
        "Sistemin belirlediği raflardan ürünleri eksiksiz topladığınızı ve transferi yola çıkarmak istediğinizi onaylıyor musunuz?",
      confirmText: "Evet, Yola Çıkar",
    });

    if (!isConfirmed) return;

    const dispatchedLines: Array<{
      transferOrderLineId: string;
      sourceShelfId: string;
      quantity: number;
    }> = [];

    order.lines.forEach((line) => {
      if (line.allocations) {
        line.allocations.forEach((a) => {
          dispatchedLines.push({
            transferOrderLineId: line.id,
            sourceShelfId: a.sourceShelfId,
            quantity: a.quantity,
          });
        });
      }
    });

    if (dispatchedLines.length === 0) {
      notifyError("Toplanacak rezervasyon bulunamadı.");
      return;
    }

    const dispatchDto: TransferOrderDispatchDto = {
      transferOrderId: order.id,
      dispatchedLines: dispatchedLines,
    };

    setIsProcessing(true);
    transferService
      .dispatchAsync(dispatchDto)
      .then(() => {
        notifySuccess(
          "Transfer onaylandı ve yola çıkarıldı. Kaynak stoklardan düşüldü.",
        );
        router.push("/documents/transfer");
      })
      .finally(() => setIsProcessing(false));
  };

  const handleReceive = async () => {
    if (!order) return;

    const isConfirmed = await confirm({
      title: "Kapı Sayımını Onayla",
      description:
        "Gelen transferi kapıda eksiksiz saydığınızı onaylıyor musunuz? Fiş 'Kabul Edildi' durumuna geçip Raflama (Putaway) ekranına düşecektir.",
      confirmText: "Evet, Onayla",
    });

    if (!isConfirmed) return;

    const receiveDto: TransferOrderReceiveDto = {
      transferOrderId: order.id,
      receivedLines: order.lines.map((line) => ({
        transferOrderLineId: line.id,
        quantity: line.dispatchedQuantity,
      })),
    };

    setIsProcessing(true);
    transferService
      .receiveAsync(receiveDto)
      .then(() => {
        notifySuccess(
          "Transfer kapıda teslim alındı. Fiş 'Kabul Edildi' durumuna geçti ve Raflama ekranına düştü.",
        );
        router.push("/documents/transfer");
      })
      .finally(() => setIsProcessing(false));
  };

  const getStatusDisplay = (status: number) => {
    switch (status) {
      case DocumentStatus.Pending:
        return { bg: "#FEF3C7", text: "#D97706", label: "Toplanmayı Bekliyor" };
      case DocumentStatus.InTransit:
        return { bg: "#E0E7FF", text: "#4338CA", label: "Yolda (In Transit)" };
      case DocumentStatus.Approved:
        return {
          bg: "#DBEAFE",
          text: "#1D4ED8",
          label: "Kabul Edildi (Raflanacak)",
        };
      case DocumentStatus.Completed:
        return {
          bg: "#D1FAE5",
          text: "#059669",
          label: "Tamamlandı (Rafa Kondu)",
        };
      case DocumentStatus.Cancelled:
        return { bg: "#FEE2E2", text: "#DC2626", label: "İptal Edildi" };
      default:
        return { bg: "#F3F4F6", text: "#4B5563", label: "Bilinmiyor" };
    }
  };

  if (loading) {
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

  if (!order) {
    return (
      <LayoutWrapper>
        <Box sx={{ textAlign: "center", py: 10 }}>Belge bulunamadı.</Box>
      </LayoutWrapper>
    );
  }

  const isPending = order.status === DocumentStatus.Pending;
  const isInTransit = order.status === DocumentStatus.InTransit;
  const statusInfo = getStatusDisplay(order.status);

  return (
    <LayoutWrapper>
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            maxWidth: "1100px",
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
              <ArrowBackIcon sx={{ color: "#374151" }} />
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
                Transfer Detayı: {order.documentNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                {new Date(order.createdDate).toLocaleString("tr-TR")} tarihinde
                oluşturuldu.
              </Typography>
            </Box>
          </Box>

          <TransferInfoPanel order={order} statusColors={statusInfo} />

          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box
              sx={{
                bgcolor: "#F9FAFB",
                p: 2.5,
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#EEF2FF",
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                }}
              >
                <ViewInArOutlinedIcon sx={{ color: "#3B82F6" }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#111827", fontSize: "1.1rem" }}
                >
                  {isPending
                    ? "Kaynak Depo Toplama Listesi"
                    : "Transfer Fişi İçeriği"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  {isPending
                    ? "Sistemin ayırdığı raflardan ürünleri toplayın."
                    : "Transferi tamamlanmış veya yoldaki ürün detayları."}
                </Typography>
              </Box>
            </Box>

            {isPending ? (
              <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FAFAFA" }}>
                {order.lines.map((line) => (
                  <TransferPendingLineItem key={line.id} line={line} />
                ))}
              </Box>
            ) : (
              <TransferResultTable lines={order.lines} status={order.status} />
            )}
          </Paper>

          {isPending && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                onClick={handleDispatch}
                disabled={isProcessing}
                variant="contained"
                startIcon={
                  isProcessing ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <OutputOutlinedIcon />
                  )
                }
                disableElevation
                sx={{
                  bgcolor: "#F59E0B",
                  color: "#FFFFFF",
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  "&:hover": { bgcolor: "#D97706" },
                }}
              >
                {isProcessing
                  ? "İşleniyor..."
                  : "Toplandı & Yola Çıkar (Dispatch)"}
              </Button>
            </Box>
          )}

          {isInTransit && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                onClick={handleReceive}
                disabled={isProcessing}
                variant="contained"
                startIcon={
                  isProcessing ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LocalShippingOutlinedIcon />
                  )
                }
                disableElevation
                sx={{
                  bgcolor: "#10B981",
                  color: "#FFFFFF",
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  "&:hover": { bgcolor: "#059669" },
                }}
              >
                {isProcessing
                  ? "İşleniyor..."
                  : "Kapı Sayımını Onayla (Kabul Et)"}
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </LayoutWrapper>
  );
}
