"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Fade,
  Divider,
} from "@mui/material";

// İkonlar
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import LayoutWrapper from "@/components/LayoutWrapper";
import { inboundService } from "@/services/documents/inboundService";
import {
  InboundOrderDetailDto,
  InboundOrderApproveDto,
} from "@/types/documents/inbound";
import { notifySuccess } from "@/lib/notificationService";

export default function InboundOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<InboundOrderDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!orderId) return;

    inboundService
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

    const approveDto: InboundOrderApproveDto = {
      inboundOrderId: order.id,
      approvedLines: order.lines.map((line) => ({
        inboundOrderLineId: line.id,
        receivedQuantity: line.expectedQuantity,
      })),
    };

    setIsApproving(true);
    inboundService
      .approveAsync(approveDto)
      .then(() => {
        notifySuccess(
          "Sayım onaylandı. Fiş durumu 'Kabul Edildi' olarak güncellendi ve Rafa Yerleştirme (Putaway) ekranına düştü.",
        );
        router.push("/documents/inbound");
      })
      .finally(() => setIsApproving(false));
  };

  const getStatusDisplay = (status: number) => {
    switch (status) {
      case 1:
        return { bg: "#FEF3C7", text: "#D97706", label: "Beklemede (Taslak)" };
      case 5:
        return {
          bg: "#DBEAFE",
          text: "#1D4ED8",
          label: "Kabul Edildi (Approved)",
        };
      case 3:
        return {
          bg: "#D1FAE5",
          text: "#059669",
          label: "Tamamlandı (Rafa Çıktı)",
        };
      case 4:
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

  const statusInfo = getStatusDisplay(order.status);
  const isPending = order.status === 1;

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
                "&:hover": { bgcolor: "#F3F4F6" },
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
                Fiş Detayı: {order.documentNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                {new Date(order.createdDate).toLocaleString("tr-TR")} tarihinde
                oluşturuldu.
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  DURUM
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={statusInfo.label}
                    size="small"
                    sx={{
                      bgcolor: statusInfo.bg,
                      color: statusInfo.text,
                      fontWeight: 700,
                      borderRadius: 1.5,
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  İŞLEM TÜRÜ
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
                >
                  {order.movementTypeName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  HEDEF DEPO
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
                >
                  {order.warehouseName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  TEDARİKÇİ
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#111827", mt: 0.5 }}
                >
                  {order.supplierName || "-"}
                </Typography>
              </Grid>

              {order.description && (
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6B7280", fontWeight: 600 }}
                  >
                    AÇIKLAMA
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#374151", mt: 0.5 }}
                  >
                    {order.description}
                  </Typography>
                </Grid>
              )}

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1, borderColor: "#F3F4F6" }} />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  OLUŞTURAN
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    mt: 0.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <PersonOutlineIcon
                    fontSize="small"
                    sx={{ color: "#9CA3AF" }}
                  />
                  {order.createdByName || "Bilinmiyor"}
                </Typography>
              </Grid>

              {order.approvedByName && (
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6B7280", fontWeight: 600 }}
                  >
                    ONAYLAYAN
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#10B981",
                      mt: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <AccountCircleOutlinedIcon fontSize="small" />
                    {order.approvedByName}
                  </Typography>
                </Grid>
              )}

              {order.cancelledByName && (
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6B7280", fontWeight: 600 }}
                  >
                    İPTAL EDEN
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#DC2626",
                      mt: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <HighlightOffOutlinedIcon fontSize="small" />
                    {order.cancelledByName}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>

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
                <InventoryOutlinedIcon sx={{ color: "#3B82F6" }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#111827", fontSize: "1.1rem" }}
                >
                  Fiş İçeriği (Ürünler)
                </Typography>
                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                  Bu mal kabul fişine ait ürünlerin detayları
                </Typography>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                      Ürün Detayı
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 600, color: "#4B5563" }}
                    >
                      Beklenen (İrsaliye)
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, color: "#4B5563", width: "45%" }}
                    >
                      İşlem Durumu
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.lines.map((line) => (
                    <TableRow
                      key={line.id}
                      hover
                      sx={{
                        "&:last-child td": { border: 0 },
                        transition: "0.2s",
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700, color: "#111827" }}
                        >
                          {line.productName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>
                          Kodu: {line.productCode}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={`${line.expectedQuantity} Adet`}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: "#F3F4F6",
                            color: "#374151",
                            borderRadius: 1.5,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {order.status === 1 ? (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              bgcolor: "#FEF3C7",
                              color: "#D97706",
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              border: "1px solid #FDE68A",
                            }}
                          >
                            <LocalShippingOutlinedIcon fontSize="small" />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              Kapı Sayımı Bekliyor
                            </Typography>
                          </Box>
                        ) : order.status === 5 ? (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              bgcolor: "#DBEAFE",
                              color: "#1D4ED8",
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              border: "1px solid #BFDBFE",
                            }}
                          >
                            <SystemUpdateAltIcon fontSize="small" />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              Kabul Edildi{" "}
                              <span style={{ opacity: 0.7 }}>(Raflanacak)</span>
                            </Typography>
                          </Box>
                        ) : order.status === 3 ? (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              bgcolor: "#ECFDF5",
                              color: "#065F46",
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              border: "1px solid #A7F3D0",
                            }}
                          >
                            <CheckCircleOutlineIcon fontSize="small" />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              Rafa Yerleştirildi
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              bgcolor: "#FEF2F2",
                              color: "#B91C1C",
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              border: "1px solid #FECACA",
                            }}
                          >
                            <CancelOutlinedIcon fontSize="small" />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              İşlem İptal
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                    <LocalShippingOutlinedIcon />
                  )
                }
                disableElevation
                sx={{
                  bgcolor: "#10B981",
                  color: "#FFFFFF",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  "&:hover": { bgcolor: "#059669" },
                }}
              >
                {isApproving
                  ? "İşleniyor..."
                  : "Mal Kabulünü Onayla (Rafa Gönder)"}
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </LayoutWrapper>
  );
}
