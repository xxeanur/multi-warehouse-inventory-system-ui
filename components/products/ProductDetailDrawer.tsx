"use client";

import { Drawer, Box, Typography, Divider } from "@mui/material";
import { productService } from "@/services/definitions/productService";
import { ProductData } from "@/app/(main)/products/page";
import { useConfirm } from "@/contexts/ConfirmContext";
import { notifySuccess, notifyError } from "@/lib/notificationService";
import { UnitType } from "@/types/definitions/product";

import ProductDrawerHeader from "./drawer/ProductDrawerHeader";
import ProductDrawerProperties from "./drawer/ProductDrawerProperties";
import ProductDrawerPricing from "./drawer/ProductDrawerPricing";
import ProductDrawerStockLocations from "./drawer/ProductDrawerStockLocations";
import ProductDrawerPhysicalStats from "./drawer/ProductDrawerPhysicalStats";
import ProductDrawerFooter from "./drawer/ProductDrawerFooter";

interface ProductDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  product: ProductData | null;
  onEdit: () => void;
  onDeleteSuccess: () => void;
  isSuperAdmin: boolean;
}

const SectionTitle = ({ title }: { title: string }) => (
  <Typography variant="subtitle2" sx={{ color: "#9CA3AF", mb: 2, fontWeight: 600, letterSpacing: 0.5, fontSize: "0.75rem" }}>
    {title}
  </Typography>
);

const SectionDivider = () => (
  <Divider sx={{ my: 3, borderStyle: "dashed", borderColor: "#E5E7EB" }} />
);

export default function ProductDetailDrawer({
  open,
  onClose,
  product,
  onEdit,
  onDeleteSuccess,
  isSuperAdmin,
}: ProductDetailDrawerProps) {
  const { confirm } = useConfirm();

  if (!product) return null;

  const handleDelete = async () => {
    if (product.totalStock > 0) {
      notifyError("Fiziksel stoğu bulunan ürünler silinemez. Lütfen önce stokları sıfırlayın.");
      return;
    }

    const isConfirmed = await confirm({
      title: "Ürünü Sil",
      description: `"${product.name}" isimli ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      confirmText: "Evet, Sil",
      cancelText: "İptal",
    });

    if (!isConfirmed) return;

    try {
      await productService.removeAsync(product.id);
      notifySuccess("Ürün başarıyla silindi.");
      onDeleteSuccess();
      onClose();
    } catch (error) {
      notifyError("Ürün silinirken bir hata oluştu.");
      console.error(error);
    }
  };

  const getUnitName = (unit: UnitType) => {
    switch (unit) {
      case UnitType.Piece: return "Adet";
      case UnitType.Kg: return "Kg";
      case UnitType.Liter: return "Litre";
      case UnitType.Meter: return "Metre";
      case UnitType.Box: return "Kutu";
      default: return "Adet";
    }
  };

  const unitName = getUnitName(product.unit);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1300 }}
      slotProps={{
        paper: { sx: { width: { xs: "100%", sm: 420 }, bgcolor: "#FFFFFF" } },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        
        <ProductDrawerHeader product={product} onClose={onClose} />

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2.5, md: 3 } }}>
          <SectionTitle title="ÜRÜN ÖZELLİKLERİ" />
          <ProductDrawerProperties product={product} unitName={unitName} />

          <SectionDivider />

          <SectionTitle title="FİYATLANDIRMA" />
          <ProductDrawerPricing costPrice={product.costPrice} unitPrice={product.unitPrice} />

          <SectionDivider />

          <SectionTitle title="STOK LOKASYONLARI (Hangi Rafta?)" />
          <ProductDrawerStockLocations locations={product.stockLocations} unitName={unitName} />

          <SectionDivider />

          <SectionTitle title="FİZİKSEL ÖZELLİKLER" />
          <ProductDrawerPhysicalStats product={product} unitName={unitName} />
        </Box>

        {isSuperAdmin && (
          <ProductDrawerFooter onDelete={handleDelete} onEdit={onEdit} />
        )}
        
      </Box>
    </Drawer>
  );
}