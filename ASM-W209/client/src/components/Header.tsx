import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person"; // New icon for user

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user's name

  // Function to handle successful login
  const handleLoginSuccess = (username: any) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("token"); // Remove token from localStorage on logout
  };

  return (
    <Wrapper
      sx={{ padding: "0 50px" }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to="/">
        <img src="./public/LogoFur.jpg" width={250} alt="logo" />
      </Link>

      <Stack direction="row" gap={4}>
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <Typography fontWeight={500}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>

      <Stack direction="row" spacing={4} alignItems="center">
        {isLoggedIn && (
          <Box display="flex" alignItems="center">
            <Typography
              fontWeight={500}
              variant="body1"
              sx={{ marginRight: 1 }}
            >
              {userName}
            </Typography>
            <PersonIcon /> {/* Display user icon */}
          </Box>
        )}

        <img src="./user.svg" alt="cart" />

        <SearchIcon />
        <FavoriteBorderIcon />

        {isLoggedIn ? (
          <Button
            variant="text"
            onMouseOver={(e) => (e.currentTarget.style.color = "red")}
            onMouseOut={(e) => (e.currentTarget.style.color = "initial")}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <Link to="/register">
              <Button variant="text">Register</Button>
            </Link>
            <Link to="/login">
              <Button variant="text">Login</Button>
            </Link>
          </Stack>
        )}

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
