"use client";

import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LayoutWrapper from "../../../components/LayoutWrapper";
import AddProductModal from "../../../components/products/AddProductModal";

import ProductsHeader from "../../../components/products/ProductsHeader";
import ProductsFilterBar from "../../../components/products/ProductsFilterBar";
import ProductsMobileList from "../../../components/products/ProductsMobileList";
import ProductsDesktopTable from "../../../components/products/ProductsDesktopTable";
import ProductDetailDrawer from "../../../components/products/ProductDetailDrawer";

// TİP GÜNCELLENDİ: Hacim string'i yerine gerçek fiziksel boyutlar geldi
interface ProductData {
  id: number;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  criticalLevel: number;
  totalStock: number;
}

// Sahte (mock) ürün verileri fiziksel boyutlarla donatıldı
const mockProducts: ProductData[] = [
  {
    id: 1,
    sku: "SKU-1001",
    name: "MacBook Pro M3",
    category: "Elektronik",
    warehouse: "Merkez Depo",
    width: 30, height: 21, depth: 2, weight: 1.6,
    criticalLevel: 10,
    totalStock: 45,
  },
  {
    id: 2,
    sku: "SKU-1002",
    name: "Dell UltraSharp Monitör",
    category: "Elektronik",
    warehouse: "Konya Şube",
    width: 61, height: 35, depth: 5, weight: 4.5,
    criticalLevel: 5,
    totalStock: 15,
  },
  {
    id: 3,
    sku: "SKU-2055",
    name: "Ergonomik Ofis Koltuğu",
    category: "Mobilya",
    warehouse: "Merkez Depo",
    width: 65, height: 110, depth: 60, weight: 18,
    criticalLevel: 20,
    totalStock: 18,
  },
  {
    id: 4,
    sku: "SKU-3012",
    name: "Type-C Çoklayıcı Hub",
    category: "Aksesuar",
    warehouse: "Konya Şube",
    width: 10, height: 4, depth: 1, weight: 0.1,
    criticalLevel: 50,
    totalStock: 120,
  },
  {
    id: 5,
    sku: "SKU-1088",
    name: "Logitech MX Master 3",
    category: "Aksesuar",
    warehouse: "Merkez Depo",
    width: 8, height: 12, depth: 5, weight: 0.14,
    criticalLevel: 15,
    totalStock: 8,
  },
];

export default function ProductsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  // Filtreleme State'leri
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedWarehouse, setSelectedWarehouse] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleRowClick = (product: ProductData) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    const matchesWarehouse =
      selectedWarehouse === "ALL" || product.warehouse === selectedWarehouse;
    const isCritical = product.totalStock <= product.criticalLevel;
    const productStatus = isCritical ? "Kritik" : "Yeterli";
    const matchesStatus =
      selectedStatus === "ALL" || productStatus === selectedStatus;

    return (
      matchesSearch && matchesCategory && matchesWarehouse && matchesStatus
    );
  });

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: { xs: 2, sm: 3, md: 0 }, pb: 4, overflowX: "hidden" }}>
        <ProductsHeader onOpenModal={() => setIsModalOpen(true)} />

        <ProductsFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedWarehouse={selectedWarehouse}
          setSelectedWarehouse={setSelectedWarehouse}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {isMobile ? (
          <ProductsMobileList products={filteredProducts} onRowClick={handleRowClick} />
        ) : (
          <ProductsDesktopTable products={filteredProducts} onRowClick={handleRowClick} />
        )}

        <ProductDetailDrawer
          open={drawerOpen}
          onClose={closeDrawer}
          product={selectedProduct}
          onEdit={() => setIsModalOpen(true)}
        />

        <AddProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Box>
    </LayoutWrapper>
  );
}