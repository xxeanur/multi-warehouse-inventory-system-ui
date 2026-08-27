import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { OutboundOrderListDto } from "@/types/documents/outbound";

export enum DocumentStatus {
  Pending = 1,
  InTransit = 2,
  Completed = 3,
  Cancelled = 4,
}

interface Props {
  orders: OutboundOrderListDto[];
  isStaff: boolean;
  isCancelling: boolean;
  onView: (id: string) => void;
  onCancel: (id: string) => void;
}

export default function OutboundListTable({
  orders,
  isStaff,
  isCancelling,
  onView,
  onCancel,
}: Props) {
  const getStatusDisplay = (status: number) => {
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

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ borderRadius: 3, border: "1px solid #E5E7EB" }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Belge No
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              İşlem Türü
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Kaynak Depo
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Oluşturulma
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Durum
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: "#374151" }}>
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
                sx={{ py: 4, color: "#6B7280" }}
              >
                Henüz kayıtlı bir mal çıkış fişi bulunmuyor.
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
                  <TableCell sx={{ fontWeight: 500, color: "#111827" }}>
                    {order.documentNumber}
                  </TableCell>
                  <TableCell>{order.movementTypeName || "-"}</TableCell>
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
                        fontWeight: 600,
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Detay / İşlem Yap">
                      <IconButton
                        onClick={() => onView(order.id)}
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

                    {/* Sadece Pending olan belgelerde ve YETKİLİ kişilere iptal butonu çıkar */}
                    {order.status === DocumentStatus.Pending && !isStaff && (
                      <Tooltip title="İptal Et">
                        <IconButton
                          onClick={() => onCancel(order.id)}
                          disabled={isCancelling}
                          sx={{
                            color: "#DC2626",
                            bgcolor: "#FEF2F2",
                            "&:hover": { bgcolor: "#FEE2E2" },
                          }}
                        >
                          {isCancelling ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <CancelOutlinedIcon fontSize="small" />
                          )}
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
