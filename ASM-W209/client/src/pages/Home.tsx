import {
  Container,
  Stack,
  Typography,
  Grid,
  Divider,
  Button,
  colors,
  Icon,
  Box,
} from "@mui/material";
import Banner from "src/components/Banner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";
import { Height, Margin, Padding } from "@mui/icons-material";

import {
  MdHighQuality,
  MdSecurity,
  MdLocalShipping,
  MdLiveHelp,
} from "react-icons/md"; // Import icons from Material-UI Icons library

const styles = {
  line: {
    width: "1151px",
    height: 1,
    backgroundColor: "black", // Màu đen nhạt với độ mờ 10%
    margin: "auto",
  },
  imageContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  image: {
    maxWidth: "50%",
  },
  textContainer: {
    paddingLeft: 16,
  },

  bg: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  productImage: {
    borderRadius: "8px 8px 0 0",

    width: "100%",
    height: 200,
  },
  productInfo: {
    padding: "20px",
  },
};

function Home() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        // Assuming the products are already sorted by date, if not, sort them first
        const latestProducts = data.slice(0, 4); // Get the latest 4 products
        setNewProducts(latestProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Banner />
      <Container>
        {/* New Products Section */}
        <Divider />
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginTop: "20px" }}
        >
          NEW
        </Typography>
        <Divider
          sx={{
            marginY: 1,
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            marginBottom: "20px",
          }}
        />
        {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
        <Grid container spacing={4} justifyContent="center">
          {newProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <div style={styles.bg}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={styles.productImage}
                  />
                  <div style={styles.productInfo}>
                    <Typography variant="h6" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography>{product.price.toLocaleString()} đ</Typography>
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
        ;
        {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
        <Divider
          sx={{
            marginY: 1,
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            marginBottom: "60px",
            marginTop: "50px",
          }}
        />
        {/* Shop Section */}
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginTop: "20px" }}
        >
          SHOP
        </Typography>
        <Divider
          sx={{
            marginY: 1,
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            marginBottom: "20px",
          }}
        />
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} md={6}>
            <img src="./public/sh1.jpg" alt="Shop 1" width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="./public/sh2.jpg" alt="Shop 2" width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="./public/sh3.jpg" alt="Shop 3" width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="./public/sh4.jpg" alt="Shop 4" width="100%" />
          </Grid>
        </Grid>
        <Divider
          sx={{
            marginY: 1,
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            marginBottom: "60px",
            marginTop: "50px",
          }}
        />
        {/* Blog Section */}
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold", marginTop: "20px" }}
        >
          BLOG
        </Typography>
        <Divider
          sx={{
            marginY: 1,
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            marginBottom: "60px",
          }}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Stack spacing={6}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <img src="./public/bl1.jpg" alt="Blog 1" width="50%" />
                <Divider orientation="vertical" flexItem />
                <Typography>
                  <Typography variant="h6">Blog Post 1 Title</Typography>
                  <Typography>Description for blog post 1</Typography>
                </Typography>
              </Stack>
              <div style={styles.line} />
              <Stack direction="row" alignItems="center" spacing={2}>
                <img src="./public/bl2.jpg" alt="Blog 2" width="50%" />
                <Divider orientation="vertical" flexItem />
                <Typography>
                  <Typography variant="h6">Blog Post 2 Title</Typography>
                  <Typography>Description for blog post 2</Typography>
                </Typography>
              </Stack>
              <div style={styles.line} />

              <Stack direction="row" alignItems="center" spacing={2}>
                <img src="./public/bl3.jpg" alt="Blog 3" width="50%" />
                <Divider orientation="vertical" flexItem />
                <Typography>
                  <Typography variant="h6">Blog Post 3 Title</Typography>
                  <Typography>Description for blog post 3</Typography>
                </Typography>
              </Stack>
              <div style={styles.line} />
            </Stack>
          </Grid>
        </Grid>
        <Divider
          sx={{ marginY: 1, marginBottom: "60px", marginTop: "100px" }}
        />
      </Container>
      {/* Icons Section */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ bgcolor: "#FFCC80" }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align="center"
            sx={{ bgcolor: "#FFCC80", p: 2, borderRadius: 1, paddingBottom: 8 }}
          >
            <Icon
              component={MdHighQuality}
              sx={{ fontSize: 48, marginBottom: 1 }}
            />
            <br />
            High Quality
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align="center"
            sx={{ bgcolor: "#FFCC80", p: 2, borderRadius: 1 }}
          >
            <Icon
              component={MdSecurity}
              sx={{ fontSize: 48, marginBottom: 1 }}
            />
            <br />
            Warranty Protection
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align="center"
            sx={{ bgcolor: "#FFCC80", p: 2, borderRadius: 1 }}
          >
            <Icon
              component={MdLocalShipping}
              sx={{ fontSize: 48, marginBottom: 1 }}
            />
            <br />
            Free Shipping
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            align="center"
            sx={{ bgcolor: "#FFCC80", p: 2, borderRadius: 1 }}
          >
            <Icon
              component={MdLiveHelp}
              sx={{ fontSize: 48, marginBottom: 1 }}
            />
            <br />
            24/7 Support
          </Typography>
        </Grid>
      </Grid>
      ;
    
      {/* Footer */}

    </>
  );
}

export default Home;
