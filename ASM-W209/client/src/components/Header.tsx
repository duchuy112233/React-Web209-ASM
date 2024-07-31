import { Badge, Stack, styled, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "src/contexts/cart";
import { useMemo, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const menus = [
  { label: "Home", link: "/" },
  { label: "Shop", link: "/shop" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const cartQuantity = useMemo(
    () => (cart ? cart.products.reduce((total, { quantity }) => total + quantity, 0) : 0),
    [cart]
  );

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    handleClose();
  };

  return (
    <Wrapper
      sx={{ padding: "0 50px" }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Link to={"/"}>
        <img src="./public/LogoFur.jpg" width={250} alt="logo" />
      </Link>

      <Stack direction={"row"} gap={"75px"}>
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <Typography fontWeight={"500"}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>
      <Stack gap={"45px"} direction={"row"}>
        {isLoggedIn ? (
          <div>
            <IconButton onClick={handleClick}>
              <Typography  color="green">{user.username} !</Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon /> Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to={"/login"}>
            <img src="/user.svg" alt="user" />
          </Link>
        )}
        <SearchIcon />
        <FavoriteBorderIcon />
        <Link to={"/cart"}>
          <Badge badgeContent={cartQuantity} color="secondary">
            <img src="/cart.svg" alt="cart" />
          </Badge>
        </Link>
      </Stack>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Stack)({
  height: 100,
  padding: "0 50px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  background: "white",
  zIndex: 1100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
