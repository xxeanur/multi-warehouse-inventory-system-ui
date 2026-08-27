"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  InputBase,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

import { searchService } from "@/services/common/searchService";
import { SearchResultItemDto, SearchTargetType } from "@/types/common/search";

export default function GlobalSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState<SearchResultItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      setAnchorEl(boxRef.current);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchResults = async (query: string) => {
    setLoading(true);
    setOpen(true);
    try {
      const data = await searchService.globalSearchAsync(query);
      setResults(data);
    } catch (error) {
      console.error("Arama yapılırken hata oluştu", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedTerm.length >= 2) {
      fetchResults(debouncedTerm);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [debouncedTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm) {
      const upperTerm = searchTerm.toUpperCase();
      if (upperTerm.startsWith("INB-"))
        router.push(`/documents/inbound?search=${upperTerm}`);
      else if (upperTerm.startsWith("OUT-"))
        router.push(`/documents/outbound?search=${upperTerm}`);
      else if (upperTerm.startsWith("TRA-"))
        router.push(`/documents/transfer?search=${upperTerm}`);

      setOpen(false);
    }
  };

  const handleResultClick = (item: SearchResultItemDto) => {
    setOpen(false);
    setSearchTerm("");

    switch (item.targetType) {
      case SearchTargetType.Product:
        router.push(`/products?productId=${item.targetId}`);
        break;
      case SearchTargetType.InboundOrder:
        router.push(`/documents/inbound/${item.targetId}`);
        break;
      case SearchTargetType.OutboundOrder:
        router.push(`/documents/outbound/${item.targetId}`);
        break;
      case SearchTargetType.TransferOrder:
        router.push(`/documents/transfer/${item.targetId}`);
        break;
      case SearchTargetType.Warehouse:
        router.push(`/warehouses/${item.targetId}`);
        break;
      default:
        console.warn("Bilinmeyen arama hedefi");
        break;
    }
  };

  const getCategoryIcon = (targetType: SearchTargetType) => {
    switch (targetType) {
      case SearchTargetType.Product:
        return <InventoryIcon fontSize="small" sx={{ color: "#4F46E5" }} />;
      case SearchTargetType.InboundOrder:
        return <InboxIcon fontSize="small" sx={{ color: "#059669" }} />;
      case SearchTargetType.OutboundOrder:
        return <LocalShippingIcon fontSize="small" sx={{ color: "#D97706" }} />;
      case SearchTargetType.TransferOrder:
        return <SyncAltIcon fontSize="small" sx={{ color: "#3B82F6" }} />;
      case SearchTargetType.Warehouse:
        return <WarehouseIcon fontSize="small" sx={{ color: "#4B5563" }} />;
      default:
        return <SearchIcon fontSize="small" sx={{ color: "#9CA3AF" }} />;
    }
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: "600px", position: "relative" }}
      ref={boxRef}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#F3F4F6",
          borderRadius: 2,
          px: 2,
          py: 0.8,
          border: "1px solid transparent",
          transition: "all 0.2s ease-in-out",
          "&:focus-within": {
            bgcolor: "#FFFFFF",
            border: "1px solid #172C4A",
            boxShadow: "0px 0px 0px 3px rgba(79, 70, 229, 0.1)",
          },
        }}
      >
        <SearchIcon sx={{ color: "#9CA3AF", mr: 1, fontSize: 20 }} />
        <InputBase
          placeholder="Ürün, belge no veya depo ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ width: "100%", fontSize: "0.875rem", color: "#374151" }}
        />
        {loading && <CircularProgress size={16} sx={{ color: "#9CA3AF" }} />}
      </Box>

      <Popper
        open={open && searchTerm.length >= 2}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{
          width: anchorEl?.clientWidth,
          zIndex: 1200,
          paddingTop: "8px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          {results.length > 0 ? (
            <List sx={{ p: 0, maxHeight: 400, overflow: "auto" }}>
              {results.map((result, index) => (
                <Box key={index}>
                  <ListItem
                    component="div"
                    onClick={() => handleResultClick(result)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#F8FAFC" },
                      px: 2,
                      py: 1.5,
                    }}
                  >
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                      {getCategoryIcon(result.targetType)}
                    </Box>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#111827" }}
                        >
                          {result.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>
                          {result.category} • {result.subtitle}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < results.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          ) : (
            !loading && (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Sonuç bulunamadı
                </Typography>
              </Box>
            )
          )}
        </Paper>
      </Popper>
    </Box>
  );
}
