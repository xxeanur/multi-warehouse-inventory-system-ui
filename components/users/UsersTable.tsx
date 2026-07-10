import {
  Box,
  Card,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface UsersTableProps {
  users: User[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, user: User) => void;
}

export default function UsersTable({ users, onMenuOpen }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <Chip
            icon={<ShieldOutlinedIcon fontSize="small" />}
            label="Süper Admin"
            size="small"
            sx={{
              bgcolor: "#EEF2FF",
              color: "#4F46E5",
              fontWeight: 700,
              borderRadius: 1.5,
              "& .MuiChip-icon": { color: "#4F46E5" },
            }}
          />
        );
      case "WAREHOUSE_MANAGER":
        return (
          <Chip
            icon={<Inventory2OutlinedIcon fontSize="small" />}
            label="Depo Sorumlusu"
            size="small"
            sx={{
              bgcolor: "#F0FDF4",
              color: "#059669",
              fontWeight: 700,
              borderRadius: 1.5,
              "& .MuiChip-icon": { color: "#059669" },
            }}
          />
        );
      case "FIELD_STAFF":
        return (
          <Chip
            icon={<PersonOutlineOutlinedIcon fontSize="small" />}
            label="Saha Personeli"
            size="small"
            sx={{
              bgcolor: "#F3F4F6",
              color: "#4B5563",
              fontWeight: 700,
              borderRadius: 1.5,
              "& .MuiChip-icon": { color: "#4B5563" },
            }}
          />
        );
      default:
        return <Chip label="Bilinmeyen Rol" size="small" />;
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === "ACTIVE") return { color: "#10B981", text: "Aktif" };
    if (status === "OFFLINE") return { color: "#9CA3AF", text: "Çevrimdışı" };
    return { color: "#EF4444", text: "Askıya Alındı" };
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        bgcolor: "#FFFFFF",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ bgcolor: "#F9FAFB" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#374151", py: 2 }}>
                Kullanıcı
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", py: 2 }}>
                Sistem Rolü
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", py: 2 }}>
                Durum
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", py: 2 }}>
                Son Giriş
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: "#374151", py: 2 }}
              >
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const statusData = getStatusStyle(user.status);
              const isMe = user.role === "SUPER_ADMIN";

              return (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#FAFAFA" },
                    transition: "0.2s",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: isMe ? "#172C4A" : "#E5E7EB",
                          color: isMe ? "#FFF" : "#4B5563",
                          fontWeight: 700,
                          fontSize: "1rem",
                        }}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: "#111827",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {user.name}{" "}
                          {isMe && (
                            <Chip
                              label="Sen"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.65rem",
                                bgcolor: "#172C4A",
                                color: "white",
                                fontWeight: 700,
                              }}
                            />
                          )}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{getRoleBadge(user.role)}</TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: statusData.color,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#374151" }}
                      >
                        {statusData.text}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>
                      {user.lastLogin}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => onMenuOpen(e, user)}
                      sx={{ color: "#4B5563" }}
                    >
                      <MoreVertOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
