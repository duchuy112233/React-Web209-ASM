import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Grid,
  Divider,
  IconButton,
  Box,
  Icon,
} from "@mui/material";
import Banner from "src/components/Banner";
import axios from "axios";
import { Product } from "src/types/Product";
import ProductCard from "src/components/ProductCard";
import Loading from "src/components/Loading";
import {
  MdHighQuality,
  MdSecurity,
  MdLocalShipping,
  MdLiveHelp,
  MdArrowUpward,
} from "react-icons/md";

const Home = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/products");
        const latestProducts = data.slice(0, 4);
        setNewProducts(latestProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200); // Show button when scrolled down 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Loading isShow={loading} />
      <Banner page="Home" />
      <Container>
        {/* New Products Section */}
        <Typography sx={{ marginTop: "60px" }}></Typography>

        <Typography
          variant="h5"
          align="left"
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          NEW
        </Typography>
        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderBottomColor: "black" }}
        />
        <Grid container spacing={4} justifyContent="center">
          {newProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* Shop Section */}
        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderBottomColor: "black" }}
        />
        <Typography sx={{ marginTop: "50px" }}></Typography>
        <Typography
          variant="h5"
          align="left"
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          SHOP
        </Typography>
        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderBottomColor: "black" }}
        />
        <Grid container spacing={2} justifyContent="center">
          {[...Array(4)].map((_, index) => (
            <Grid item key={index} xs={12} md={6}>
              <img
                src={`./public/sh${index + 1}.jpg`}
                alt={`Shop ${index + 1}`}
                width="100%"
              />
            </Grid>
          ))}
        </Grid>

        {/* Blog Section */}
        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderBottomColor: "black" }}
        />
        <Typography sx={{ marginTop: "50px" }}></Typography>
        <Typography
          variant="h5"
          align="left"
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          BLOG
        </Typography>
        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderBottomColor: "black" }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Stack spacing={6}>
              {[1, 2, 3].map((num) => (
                <Stack
                  key={num}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <img
                    src={`./public/bl${num}.jpg`}
                    alt={`Blog ${num}`}
                    width="50%"
                  />
                  <Divider orientation="vertical" flexItem />
                  <Typography>
                    <Typography variant="h6">Blog Post {num} Title</Typography>
                    <Typography>Description for blog post {num}</Typography>
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderBottomColor: "black" }}
        />
      </Container>
      <Divider sx={{ marginTop: "100px" }} />
      {/* Icons Section */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ bgcolor: "#FFCC80" }}
      >
        {[MdHighQuality, MdSecurity, MdLocalShipping, MdLiveHelp].map(
          (IconComponent, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#FFCC80",
                  p: 2,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Icon component={IconComponent} sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body1">
                  {
                    [
                      "High Quality",
                      "Warranty Protection",
                      "Free Shipping",
                      "24/7 Support",
                    ][index]
                  }
                </Typography>
              </Box>
            </Grid>
          )
        )}
      </Grid>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <IconButton
          onClick={handleScrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <MdArrowUpward />
        </IconButton>
      )}
    </>
  );
};

export default Home;
