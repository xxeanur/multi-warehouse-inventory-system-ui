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
  Tooltip,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { CategoryDto } from "@/types/definitions/category";
import { categoryService } from "@/services/definitions/categoryService";
import { notifySuccess, notifyError } from "@/lib/notificationService";
import { useConfirm } from "@/contexts/ConfirmContext"; // Silme için eklendi

interface CategoryTableProps {
  categories: CategoryDto[];
  loading: boolean;
  isSuperAdmin: boolean;
  onEditClick: (category: CategoryDto) => void;
  onRefresh: () => void;
}

export default function CategoryTable({
  categories,
  loading,
  isSuperAdmin,
  onEditClick,
  onRefresh,
}: CategoryTableProps) {
  const { confirm } = useConfirm();

  const handleDeleteClick = async (category: CategoryDto) => {
    const isConfirmed = await confirm({
      title: "Kategoriyi Sil",
      description: `"${category.name}" isimli kategoriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });

    if (!isConfirmed) return;

    try {
      await categoryService.removeAsync(category.id);
      notifySuccess("Kategori başarıyla silindi.");
      onRefresh();
    } catch (error) {
      notifyError("Kategori silinirken bir hata oluştu.");
      console.error(error);
    }
  };

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
      <Table sx={{ minWidth: 600 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Kategori Adı
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Açıklama
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
              Oluşturulma Tarihi
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
          {categories.map((category) => (
            <TableRow
              key={category.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: "#F9FAFB" },
              }}
            >
              <TableCell sx={{ fontWeight: 500, color: "#111827" }}>
                {category.name}
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>
                {category.description || "-"}
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>
                {category.createdDate
                  ? new Date(category.createdDate).toLocaleDateString("tr-TR")
                  : "-"}
              </TableCell>
              {isSuperAdmin && (
                <TableCell align="right">
                  <Tooltip title="Düzenle">
                    <IconButton
                      onClick={() => onEditClick(category)}
                      sx={{ color: "#3B82F6", mr: 1 }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton
                      onClick={() => handleDeleteClick(category)}
                      sx={{ color: "#EF4444" }}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
          {!loading && categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={isSuperAdmin ? 4 : 3}
                align="center"
                sx={{ py: 4, color: "#6B7280" }}
              >
                Sistemde kayıtlı kategori bulunamadı.
              </TableCell>
            </TableRow>
          )}
          {loading && (
            <TableRow>
              <TableCell
                colSpan={isSuperAdmin ? 4 : 3}
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
