"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";
import { supplierService } from "@/services/definitions/supplierService";
import { SupplierDto } from "@/types/definitions/supplier";
import { notifySuccess, notifyError } from "@/lib/notificationService";
import { userService } from "@/services/identity/userService";
import { UserRole } from "@/types/identity/user";
import { useConfirm } from "@/contexts/ConfirmContext";

import SupplierHeader from "@/components/suppliers/SupplierHeader";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierDetailDrawer from "@/components/suppliers/SupplierDetailDrawer";
import SupplierDialog from "@/components/suppliers/SupplierDialog";

export default function SuppliersPage() {
  const { confirm } = useConfirm();

  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState<SupplierDto | null>(
    null,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDto | null>(
    null,
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const data = await supplierService.getAllAsync();
        setSuppliers(data);

        const user = await userService.getMeAsync();
        if (user.role === UserRole.SuperAdmin) {
          setIsSuperAdmin(true);
        }
      } catch (error) {
        console.error("Veriler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchInitialData();
  }, []);

  const reloadSuppliers = async () => {
    const data = await supplierService.getAllAsync();
    setSuppliers(data);
  };

  const handleRowClick = (supplier: SupplierDto) => {
    setSelectedSupplier(supplier);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedSupplier(null), 300);
  };

  const handleOpenDialog = (supplier?: SupplierDto, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (supplier) {
      setEditingSupplier(supplier);
    } else {
      setEditingSupplier(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSupplier(null);
  };

  const handleDelete = async (
    id: string,
    companyName: string,
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation();

    const isConfirmed = await confirm({
      title: "Tedarikçiyi Sil",
      description: `"${companyName}" isimli tedarikçiyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });

    if (!isConfirmed) return;

    try {
      await supplierService.removeAsync(id);
      notifySuccess("Tedarikçi başarıyla silindi.");
      closeDrawer();
      await reloadSuppliers();
    } catch (error) {
      notifyError("Tedarikçi silinirken bir hata oluştu.");
      console.error(error);
    }
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 3, md: 0 },
          pb: 4,
          overflowX: "hidden",
        }}
      >
        <SupplierHeader
          isSuperAdmin={isSuperAdmin}
          onAddClick={() => handleOpenDialog()}
        />

        <SupplierTable
          suppliers={suppliers}
          loading={loading}
          isSuperAdmin={isSuperAdmin}
          onRowClick={handleRowClick}
          onEditClick={handleOpenDialog}
          onDeleteClick={handleDelete}
        />

        <SupplierDetailDrawer
          open={drawerOpen}
          supplier={selectedSupplier}
          onClose={closeDrawer}
          isSuperAdmin={isSuperAdmin}
          onEditClick={handleOpenDialog}
          onDeleteClick={handleDelete}
        />

        {isSuperAdmin && (
          <SupplierDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onSuccess={reloadSuppliers}
            editingSupplier={editingSupplier}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
}
