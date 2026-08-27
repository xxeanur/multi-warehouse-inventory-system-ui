"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import {
  InboundOrderListDto,
  DocumentStatus,
  MovementType,
} from "@/types/documents/inbound";
import { UserDto, UserRole } from "@/types/identity/user";

interface InboundOrdersTableProps {
  orders: InboundOrderListDto[];
  currentUser: UserDto | null;
  onCancelClick: (orderId: string) => void;
}

const getStatusDisplay = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.Pending:
      return { bg: "#FEF3C7", text: "#D97706", label: "Beklemede (Taslak)" };
    case DocumentStatus.Approved:
      return {
        bg: "#DBEAFE",
        text: "#1D4ED8",
        label: "Kabul Edildi (Approved)",
      };
    case DocumentStatus.Completed:
      return {
        bg: "#D1FAE5",
        text: "#059669",
        label: "Tamamlandı (Rafa Çıktı)",
      };
    case DocumentStatus.Cancelled:
      return { bg: "#FEE2E2", text: "#DC2626", label: "İptal Edildi" };
    default:
      return { bg: "#F3F4F6", text: "#4B5563", label: "Bilinmiyor" };
  }
};

const getMovementTypeDisplay = (type: MovementType) => {
  switch (type) {
    case MovementType.Inbound:
      return "Tedarikçi Alımı";
    case MovementType.CustomerReturn:
      return "Müşteri İadesi";
    case MovementType.TransferIn:
      return "Depo Transferi (Giriş)";
    case MovementType.AdjustmentIn:
      return "Sayım Fazlası (Giriş)";
    default:
      return "Diğer Giriş İşlemi";
  }
};

export default function InboundOrdersTable({
  orders,
  currentUser,
  onCancelClick,
}: InboundOrdersTableProps) {
  const router = useRouter();

  // Yetki Kontrolü: Saha personeli (Staff) fiş iptal edemez.
  const canCancel =
    currentUser?.role === UserRole.SuperAdmin ||
    currentUser?.role === UserRole.WarehouseManager;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ borderRadius: 3, border: "1px solid #E5E7EB" }}
    >
      <Table sx={{ minWidth: 800 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              Belge No
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              Hareket Tipi
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              Tedarikçi
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              Hedef Depo
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              Oluşturulma
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              Durum
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
            >
              İşlemler
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ py: 6, color: "#6B7280" }}
              >
                Henüz kayıtlı bir mal kabul fişi bulunmuyor.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
              const statusInfo = getStatusDisplay(order.status);

              return (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 600, color: "#111827" }}>
                    {order.documentNumber}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: "#4B5563" }}
                    >
                      {getMovementTypeDisplay(order.movementType)}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.supplierName || "-"}</TableCell>
                  <TableCell>{order.warehouseName}</TableCell>
                  <TableCell>
                    {new Date(order.createdDate).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Detay / İşlem Yap">
                      <IconButton
                        onClick={() =>
                          router.push(`/documents/inbound/${order.id}`)
                        }
                        sx={{
                          color: "#3B82F6",
                          bgcolor: "#EFF6FF",
                          mr: 1,
                          "&:hover": { bgcolor: "#DBEAFE" },
                        }}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* İptal Butonu Kuralı: Tamamlanmış (3) ve İptal Edilmiş (4) olmamalı. VE Kullanıcının yetkisi olmalı. */}
                    {order.status !== DocumentStatus.Completed &&
                      order.status !== DocumentStatus.Cancelled &&
                      canCancel && (
                        <Tooltip title="İptal Et">
                          <IconButton
                            onClick={() => onCancelClick(order.id)}
                            sx={{
                              color: "#DC2626",
                              bgcolor: "#FEF2F2",
                              "&:hover": { bgcolor: "#FEE2E2" },
                            }}
                          >
                            <CancelOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
