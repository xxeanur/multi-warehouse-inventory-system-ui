import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { TransferOrderDetailDto } from "@/types/documents/transfer";

export enum DocumentStatus {
  Pending = 1,
  InTransit = 2,
  Completed = 3,
  Cancelled = 4,
  Approved = 5,
}

interface Props {
  lines: TransferOrderDetailDto["lines"];
  status: number;
}

export default function TransferResultTable({ lines, status }: Props) {
  return (
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
              Miktar
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#4B5563", width: "45%" }}>
              İşlem Sonucu
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lines.map((line) => (
            <TableRow
              key={line.id}
              hover
              sx={{ "&:last-child td": { border: 0 }, transition: "0.2s" }}
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
                  label={`${line.dispatchedQuantity > 0 ? line.dispatchedQuantity : line.expectedQuantity} Adet`}
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
                {status === DocumentStatus.InTransit ? (
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
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Kapı Sayımı Bekleniyor (Yolda)
                    </Typography>
                  </Box>
                ) : status === DocumentStatus.Approved ? (
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
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Kabul Edildi{" "}
                      <span style={{ opacity: 0.7 }}>(Raflanacak)</span>
                    </Typography>
                  </Box>
                ) : status === DocumentStatus.Completed ? (
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
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
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
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
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
  );
}
