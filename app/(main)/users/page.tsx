"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import LayoutWrapper from "../../../components/LayoutWrapper";

import UsersHeader from "../../../components/users/UsersHeader";
import UsersTable from "../../../components/users/UsersTable";
import UserActionMenu from "../../../components/users/UserActionMenu";
import ResetPasswordDialog from "../../../components/users/ResetPasswordDialog";
import AddUserDialog from "../../../components/users/AddUserDialog";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}


const mockUsers: User[] = [
  { id: 1, name: "Esra Nur Çomak", email: "esra@system.com", role: "SUPER_ADMIN", status: "ACTIVE", lastLogin: "Şu an" },
  { id: 2, name: "Ahmet Yılmaz", email: "ahmet.y@system.com", role: "WAREHOUSE_MANAGER", status: "ACTIVE", lastLogin: "2 saat önce" },
  { id: 3, name: "Ayşe Demir", email: "ayse.d@system.com", role: "FIELD_STAFF", status: "OFFLINE", lastLogin: "Dün 16:45" },
  { id: 4, name: "Mehmet Kaya", email: "mehmet.k@system.com", role: "FIELD_STAFF", status: "SUSPENDED", lastLogin: "1 hafta önce" },
];

export default function UsersPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
const [addUserOpen, setAddUserOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleResetPasswordOpen = () => {
    setResetPasswordOpen(true);
    setAnchorEl(null);
  };

  const handleResetPasswordClose = () => {
    setResetPasswordOpen(false);
  };

  return (
    <LayoutWrapper>
      <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", pb: 6 }}>
        
        <UsersHeader onAddUserClick={() => setAddUserOpen(true)}/>

        <UsersTable users={mockUsers} onMenuOpen={handleMenuOpen} />

        <UserActionMenu 
          anchorEl={anchorEl} 
          selectedUser={selectedUser} 
          onClose={handleMenuClose} 
          onResetPasswordOpen={handleResetPasswordOpen} 
        />

        <ResetPasswordDialog 
          open={resetPasswordOpen} 
          onClose={handleResetPasswordClose} 
          selectedUser={selectedUser} 
        />
        
        <AddUserDialog 
          open={addUserOpen} 
          onClose={() => setAddUserOpen(false)} 
        />
      </Box>
    </LayoutWrapper>
  );
}