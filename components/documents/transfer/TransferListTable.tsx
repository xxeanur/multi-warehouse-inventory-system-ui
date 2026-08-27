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
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { TransferOrderListDto } from "@/types/documents/transfer";

export enum DocumentStatus {
  Pending = 1,
  InTransit = 2,
  Completed = 3,
  Cancelled = 4,
  Approved = 5,
}

interface Props {
  orders: TransferOrderListDto[];
  isStaff: boolean;
  isCancelling: boolean;
  onView: (id: string) => void;
  onCancel: (id: string) => void;
}

export default function TransferListTable({
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
      case DocumentStatus.InTransit:
        return { bg: "#E0E7FF", text: "#4338CA", label: "Yolda (InTransit)" };
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
          label: "Tamamlandı (Teslim Alındı)",
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
              Hedef Depo
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
                colSpan={8}
                align="center"
                sx={{ py: 4, color: "#6B7280" }}
              >
                Henüz kayıtlı bir transfer işlemi bulunmuyor.
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
                  <TableCell>Depolar Arası Transfer</TableCell>
                  <TableCell>{order.sourceWarehouseName}</TableCell>
                  <TableCell>{order.targetWarehouseName}</TableCell>

                  <TableCell>
                    {new Date(order.createdDate).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={
                        statusInfo.label.includes("Yolda") ? (
                          <LocalShippingOutlinedIcon
                            style={{ color: statusInfo.text, fontSize: 16 }}
                          />
                        ) : statusInfo.label.includes("Kabul Edildi") ? (
                          <SystemUpdateAltIcon
                            style={{ color: statusInfo.text, fontSize: 16 }}
                          />
                        ) : undefined
                      }
                      label={statusInfo.label}
                      size="small"
                      sx={{
                        bgcolor: statusInfo.bg,
                        color: statusInfo.text,
                        fontWeight: 600,
                        borderRadius: 1.5,
                        pl:
                          statusInfo.label.includes("Yolda") ||
                          statusInfo.label.includes("Kabul Edildi")
                            ? 0.5
                            : 0,
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
