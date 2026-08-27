"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";
import CategoryHeader from "@/components/categories/CategoryHeader";
import CategoryTable from "@/components/categories/CategoryTable";
import CategoryDialog from "@/components/categories/CategoryDialog";
import { categoryService } from "@/services/definitions/categoryService";
import { userService } from "@/services/identity/userService";
import { CategoryDto } from "@/types/definitions/category";
import { UserRole } from "@/types/identity/user";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(
    null,
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllAsync();
      setCategories(data);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = async () => {
    try {
      const user = await userService.getMeAsync();
      if (user.role === UserRole.SuperAdmin) {
        setIsSuperAdmin(true);
      }
    } catch (error) {
      console.error("Kullanıcı rolü alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchUserRole();
  }, []);

  const handleOpenDialog = (category?: CategoryDto) => {
    if (category) {
      setEditingCategory(category);
    } else {
      setEditingCategory(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
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
        <CategoryHeader
          isSuperAdmin={isSuperAdmin}
          onAddClick={() => handleOpenDialog()}
        />

        <CategoryTable
          categories={categories}
          loading={loading}
          isSuperAdmin={isSuperAdmin}
          onEditClick={handleOpenDialog}
          onRefresh={fetchCategories}
        />

        {isSuperAdmin && (
          <CategoryDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            onSuccess={fetchCategories}
            editingCategory={editingCategory}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
}
