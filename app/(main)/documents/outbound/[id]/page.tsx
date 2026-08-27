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

import LayoutWrapper from "@/components/LayoutWrapper";
import OutboundInfoPanel from "@/components/documents/outbound/outbound-detail/OutboundInfoPanel";
import OutboundLineItem from "@/components/documents/outbound/outbound-detail/OutboundLineItem";
import OutboundResultTable from "@/components/documents/outbound/outbound-detail/OutboundResultTable";

import { outboundService } from "@/services/documents/outboundService";
import {
  OutboundOrderDetailDto,
  OutboundOrderApproveDto,
} from "@/types/documents/outbound";
import { notifyError, notifySuccess } from "@/lib/notificationService";

export enum DocumentStatus {
  Pending = 1,
  InTransit = 2,
  Completed = 3,
  Cancelled = 4,
}

export default function OutboundOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<OutboundOrderDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!orderId) return;

    outboundService
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

  const handleApprove = () => {
    if (!order) return;

    const pickedLines: Array<{
      outboundOrderLineId: string;
      shelfId: string;
      quantity: number;
    }> = [];

    order.lines.forEach((line) => {
      if (line.allocations) {
        line.allocations.forEach((a) => {
          pickedLines.push({
            outboundOrderLineId: line.id,
            shelfId: a.shelfId,
            quantity: a.quantity,
          });
        });
      }
    });

    if (pickedLines.length === 0) {
      notifyError("Toplanacak rezervasyon bulunamadı.");
      return;
    }

    const approveDto: OutboundOrderApproveDto = {
      outboundOrderId: order.id,
      pickedLines: pickedLines,
    };

    setIsApproving(true);
    outboundService
      .approveAsync(approveDto)
      .then(() => {
        notifySuccess(
          "Toplama işlemi onaylandı. Stoklar rezervden ve fiziksel raftan düşüldü.",
        );
        router.push("/documents/outbound");
      })
      .finally(() => setIsApproving(false));
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case DocumentStatus.Pending:
        return { bg: "#FEF3C7", text: "#D97706", label: "Toplanmayı Bekliyor" };
      case DocumentStatus.Completed:
        return {
          bg: "#D1FAE5",
          text: "#059669",
          label: "Tamamlandı (Çıkış Yapıldı)",
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
  const statusColors = getStatusColor(order.status);

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
                Çıkış Detayı: {order.documentNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                {new Date(order.createdDate).toLocaleString("tr-TR")} tarihinde
                oluşturuldu.
              </Typography>
            </Box>
          </Box>

          <OutboundInfoPanel order={order} statusColors={statusColors} />

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
                  Toplama Listesi (Pick List)
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  Bu fişe ait toplanacak ürünlerin detayları
                </Typography>
              </Box>
            </Box>

            {isPending ? (
              <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FAFAFA" }}>
                {order.lines.map((line) => (
                  <OutboundLineItem key={line.id} line={line} />
                ))}
              </Box>
            ) : (
              <OutboundResultTable lines={order.lines} status={order.status} />
            )}
          </Paper>

          {isPending && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                onClick={handleApprove}
                disabled={isApproving}
                variant="contained"
                startIcon={
                  isApproving ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <OutputOutlinedIcon />
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
                {isApproving
                  ? "Onaylanıyor..."
                  : "Toplama İşlemini Onayla (Stoktan Düş)"}
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </LayoutWrapper>
  );
}
