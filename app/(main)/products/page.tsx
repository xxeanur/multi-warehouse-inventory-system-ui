"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import LayoutWrapper from "@/components/LayoutWrapper";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsFilterBar from "@/components/products/ProductsFilterBar";
import ProductsMobileList from "@/components/products/ProductsMobileList";
import ProductsDesktopTable from "@/components/products/ProductsDesktopTable";
import ProductDetailDrawer from "@/components/products/ProductDetailDrawer";
import AddProductModal from "@/components/products/AddProductModal";

import { productService } from "@/services/definitions/productService";
import { categoryService } from "@/services/definitions/categoryService";
import { warehouseService } from "@/services/definitions/warehouseService";
import { shelfService } from "@/services/definitions/shelfService";
import { stockService } from "@/services/inventory/stockService";
import { supplierService } from "@/services/definitions/supplierService";

import { CategoryDto } from "@/types/definitions/category";
import { WarehouseDto } from "@/types/definitions/warehouse";
import { SupplierDto } from "@/types/definitions/supplier";
import { UnitType } from "@/types/definitions/product";
import { userService } from "@/services/identity/userService";
import { UserRole } from "@/types/identity/user";

export interface StockLocation {
  warehouseName: string;
  shelfName: string;
  quantity: number;
}

export interface ProductData {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  brand: string;
  category: string;
  categoryId?: string;
  supplierId?: string;
  warehouse: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  criticalLevel: number;
  totalStock: number;
  unitPrice: number;
  costPrice: number;
  unit: UnitType;
  stockLocations: StockLocation[];
}

export default function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseDto[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedWarehouse, setSelectedWarehouse] = useState("ALL");
  const [selectedSupplier, setSelectedSupplier] = useState("ALL");

  // SENIOR DOKUNUŞU (DEEP LINKING):
  // State başlatılırken URL'de "status" parametresi varsa onu al, yoksa "ALL" yap!
  // Böylece /products?status=Kritik ile gelindiğinde tablo anında filtrelenmiş gelir.
  const [selectedStatus, setSelectedStatus] = useState<string>(() => {
    return searchParams.get("status") || "ALL";
  });

  const loadProducts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);

    try {
      const [
        productsData,
        categoriesData,
        warehousesData,
        shelvesData,
        stocksData,
        suppliersData,
      ] = await Promise.all([
        productService.getAllAsync(),
        categoryService.getAllAsync(),
        warehouseService.getAllAsync(),
        shelfService.getAllAsync(),
        stockService.getAllAsync(),
        supplierService.getAllAsync(),
      ]);

      if (signal?.aborted) return;

      const user = await userService.getMeAsync();
      if (user.role === UserRole.SuperAdmin) {
        setIsSuperAdmin(true);
      }

      setCategories(categoriesData);
      setWarehouses(warehousesData);
      setSuppliers(suppliersData);

      const categoryMap = new Map(categoriesData.map((c) => [c.id, c.name]));
      const warehouseMap = new Map(warehousesData.map((w) => [w.id, w.name]));
      const shelfMap = new Map(shelvesData.map((s) => [s.id, s.shelfNumber]));

      const stockByProduct = new Map<string, typeof stocksData>();
      stocksData.forEach((s) => {
        if (!stockByProduct.has(s.productId))
          stockByProduct.set(s.productId, []);
        stockByProduct.get(s.productId)!.push(s);
      });

      const mappedData: ProductData[] = productsData.map((p) => {
        const productStocks = stockByProduct.get(p.id) || [];

        let totalStock = 0;
        const uniqueWarehouses = new Set<string>();
        const locations: StockLocation[] = [];

        productStocks.forEach((st) => {
          totalStock += st.quantity;
          uniqueWarehouses.add(st.warehouseId);
          locations.push({
            warehouseName:
              warehouseMap.get(st.warehouseId) || "Bilinmeyen Depo",
            shelfName: shelfMap.get(st.shelfId) || "Bilinmeyen Raf",
            quantity: st.quantity,
          });
        });

        let warehouseText = "Stokta Yok";
        if (uniqueWarehouses.size === 1) {
          const wId = Array.from(uniqueWarehouses)[0];
          warehouseText = warehouseMap.get(wId) || "Bilinmeyen Depo";
        } else if (uniqueWarehouses.size > 1) {
          warehouseText = "Çoklu Depo";
        }

        return {
          id: p.id,
          sku: p.sku,
          barcode: p.barcode,
          name: p.name,
          brand: p.brand,
          category: categoryMap.get(p.categoryId) || "Genel",
          categoryId: p.categoryId,
          supplierId: p.supplierId,
          warehouse: warehouseText,
          width: p.width,
          height: p.height,
          depth: p.depth,
          weight: p.weight,
          criticalLevel: p.criticalLevel,
          totalStock: totalStock,
          unitPrice: p.unitPrice,
          costPrice: p.costPrice,
          unit: p.unit,
          stockLocations: locations,
        };
      });

      setProducts(mappedData);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [loadProducts]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const productIdFromUrl = searchParams.get("productId");
      if (productIdFromUrl) {
        const productToOpen = products.find((p) => p.id === productIdFromUrl);
        if (productToOpen) {
          setSelectedProduct(productToOpen);
          setDrawerOpen(true);
        }
      }
    }
  }, [loading, products, searchParams]);

  const handleRowClick = (product: ProductData) => {
    setSelectedProduct(product);
    setDrawerOpen(true);

    const currentStatus = searchParams.get("status");
    const queryStr = currentStatus
      ? `?status=${currentStatus}&productId=${product.id}`
      : `?productId=${product.id}`;
    router.replace(`/products${queryStr}`);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);

    const currentStatus = searchParams.get("status");
    router.replace(
      currentStatus ? `/products?status=${currentStatus}` : "/products",
    );
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = () => {
    setIsModalOpen(true);
    setDrawerOpen(false);
  };

  const handleSuccessAction = () => {
    setIsModalOpen(false);
    setDrawerOpen(false);

    const currentStatus = searchParams.get("status");
    router.replace(
      currentStatus ? `/products?status=${currentStatus}` : "/products",
    );
    void loadProducts();
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;

    const matchesWarehouse =
      selectedWarehouse === "ALL" ||
      product.warehouse === selectedWarehouse ||
      (product.warehouse === "Çoklu Depo" &&
        product.stockLocations.some(
          (l) => l.warehouseName === selectedWarehouse,
        ));

    const isCritical = product.totalStock <= product.criticalLevel;
    const productStatus = isCritical ? "Kritik" : "Yeterli";
    const matchesStatus =
      selectedStatus === "ALL" || selectedStatus === productStatus;

    const matchesSupplier =
      selectedSupplier === "ALL" || product.supplierId === selectedSupplier;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesWarehouse &&
      matchesStatus &&
      matchesSupplier
    );
  });

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
        <ProductsHeader
          onOpenModal={handleOpenAddModal}
          isSuperAdmin={isSuperAdmin}
        />

        <ProductsFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedWarehouse={selectedWarehouse}
          setSelectedWarehouse={setSelectedWarehouse}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
          categories={categories}
          warehouses={warehouses}
          suppliers={suppliers}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#172C4A" }} />
          </Box>
        ) : isMobile ? (
          <ProductsMobileList
            products={filteredProducts}
            onRowClick={handleRowClick}
          />
        ) : (
          <ProductsDesktopTable
            products={filteredProducts}
            onRowClick={handleRowClick}
            isSuperAdmin={isSuperAdmin}
            onEdit={handleOpenEditModal}
            onDeleteSuccess={handleSuccessAction}
          />
        )}

        <ProductDetailDrawer
          open={drawerOpen}
          onClose={closeDrawer}
          product={selectedProduct}
          onEdit={handleOpenEditModal}
          onDeleteSuccess={handleSuccessAction}
          isSuperAdmin={isSuperAdmin}
        />

        {isSuperAdmin && (
          <AddProductModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccessAction}
            productToEdit={selectedProduct}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
}
