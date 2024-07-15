import { Box, Stack, styled, Typography } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Shop",
    link: "/shop",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  return (
    <Wrapper
      sx={{ padding: "0 50px" }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
          <Link to="/">
          <img src="./logo.svg" alt="logo" />
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
        {/* icon  */}
        <Link to="/admin">
        <img src="./user.svg" alt="user" />
        </Link>
       
        <SearchIcon />
        <FavoriteBorderIcon />
        <Link to="/cart">
          <img src="./cart.svg" alt="cart" />
        </Link>
      </Stack>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Stack)({
  height: 100,
  padding: "0 50px",
});
