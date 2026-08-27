"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SupplierDto } from "@/types/definitions/supplier";

interface SupplierTableProps {
  suppliers: SupplierDto[];
  loading: boolean;
  isSuperAdmin: boolean;
  onRowClick: (supplier: SupplierDto) => void;
  onEditClick: (supplier: SupplierDto, e?: React.MouseEvent) => void;
  onDeleteClick: (
    id: string,
    companyName: string,
    e?: React.MouseEvent,
  ) => void;
}

export default function SupplierTable({
  suppliers,
  loading,
  isSuperAdmin,
  onRowClick,
  onEditClick,
  onDeleteClick,
}: SupplierTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 800 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Firma Adı
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              İlgili Kişi
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              İletişim
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Vergi No / Daire
            </TableCell>
            {isSuperAdmin && (
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: "#374151" }}
              >
                İşlemler
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow
              key={supplier.id}
              onClick={() => onRowClick(supplier)}
              sx={{
                cursor: "pointer",
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: "#F9FAFB" },
              }}
            >
              <TableCell sx={{ fontWeight: 500, color: "#111827" }}>
                {supplier.companyName}
              </TableCell>
              <TableCell sx={{ color: "#4B5563" }}>
                {supplier.contactName || "-"}
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>
                <Typography variant="body2">{supplier.email || "-"}</Typography>
                <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                  {supplier.phone || ""}
                </Typography>
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>
                <Typography variant="body2">
                  {supplier.taxNumber || "-"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                  {supplier.taxOffice || ""}
                </Typography>
              </TableCell>
              {isSuperAdmin && (
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Düzenle">
                    <IconButton
                      onClick={(e) => onEditClick(supplier, e)}
                      sx={{ color: "#3B82F6", mr: 1 }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton
                      onClick={(e) =>
                        onDeleteClick(supplier.id, supplier.companyName, e)
                      }
                      sx={{ color: "#EF4444" }}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
          {!loading && suppliers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={isSuperAdmin ? 5 : 4}
                align="center"
                sx={{ py: 4, color: "#6B7280" }}
              >
                Sistemde kayıtlı tedarikçi bulunamadı.
              </TableCell>
            </TableRow>
          )}
          {loading && (
            <TableRow>
              <TableCell
                colSpan={isSuperAdmin ? 5 : 4}
                align="center"
                sx={{ py: 4, color: "#6B7280" }}
              >
                Yükleniyor...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
