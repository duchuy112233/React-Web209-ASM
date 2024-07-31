import { Badge, Stack, styled, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useCart } from "src/contexts/cart";
import { useMemo } from "react";

const menus = [
  { label: "Home", link: "/" },
  { label: "Shop", link: "/shop" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

const Header = () => {
  const { cart } = useCart();

  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );

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
        {/* menu */}

        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <Typography fontWeight={"500"}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>
      <Stack gap={"45px"} direction={"row"}>
        <Link to={"/login"}>
          <img src="/user.svg" alt="user" />
        </Link>

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

  zIndex: 1100, // Đảm bảo nó nằm trên các phần tử khác

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
