import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Icon,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState(null);

  const handleMenuClose = () => {
    setIsOpen(false);
    setCurrentState(null);
  };

  const handleMenuOpen = (event) => {
    setCurrentState(event.currentTarget);
    setIsOpen(true);
  };

  const handleCreate = () => {
    navigate('/create')
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f37021" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginRight: "10px",
          }}
        >
          PRODUCT STORE
          <Icon color="inherit" aria-label="cart">
            <ShoppingCartIcon />
          </Icon>
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={currentState} open={isOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleCreate} onClose={handleMenuClose}>
              Create
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>

          <IconButton edge="end" color="inherit" aria-label="menu">
            <DarkModeOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
