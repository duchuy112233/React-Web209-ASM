import {
  Container,
  Stack,
  Typography,
  Grid,
  Divider,
  Button,
  colors,
} from "@mui/material";
import Banner from "src/components/Banner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";
import { Height, Margin, Padding } from "@mui/icons-material";

const styles = {
  line: {
    width: "1150px",
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Màu đen nhạt với độ mờ 10%
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
    backgroundColor: "rgba(0, 0, 0, 0.08)",
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
        <Typography variant="h5" align="left" gutterBottom>
          New
        </Typography>
        <Divider sx={{ marginY: 1 }} />
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
                    width="100%"
                    height={200}
                    className="product-image"
                  />
                  <div style={{ padding: 25 }}>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography>{product.price.toLocaleString()} đ</Typography>
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginY: 4 }} />

        {/* Shop Section */}
        <Typography variant="h5" align="left" gutterBottom>
          Shop
        </Typography>
        <Divider sx={{ marginY: 1 }} />

        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} md={6}>
            <img
              src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
              alt="Shop 1"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
              alt="Shop 2"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
              alt="Shop 3"
              width="100%"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
              alt="Shop 4"
              width="100%"
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 4 }} />

        {/* Blog Section */}
        <Typography variant="h5" align="left" gutterBottom>
          Blog
        </Typography>
        <Divider sx={{ marginY: 1 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <img
                  src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
                  alt="Blog 1"
                  width="50%"
                />
                <Divider orientation="vertical" flexItem />
                <Typography>
                  <Typography variant="h6">Blog Post 1 Title</Typography>
                  <Typography>Description for blog post 1</Typography>
                </Typography>
              </Stack>
              <div style={styles.line} />
              <Stack direction="row" alignItems="center" spacing={2}>
                <img
                  src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
                  alt="Blog 2"
                  width="50%"
                />
                <Divider orientation="vertical" flexItem />
                <Typography>
                  <Typography variant="h6">Blog Post 2 Title</Typography>
                  <Typography>Description for blog post 2</Typography>
                </Typography>
              </Stack>
              <div style={styles.line} />

              <Stack direction="row" alignItems="center" spacing={2}>
                <img
                  src="https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png"
                  alt="Blog 3"
                  width="50%"
                />
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
        <Divider sx={{ marginY: 10 }} />

        {/* Icons Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Typography align="center">
              <img src="./high_quality.png" alt="High Quality" />
              <br />
              High Quality
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center">
              <img src="./warranty.png" alt="Warranty Protection" />
              <br />
              Warranty Protection
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center">
              <img src="./free_shipping.png" alt="Free Shipping" />
              <br />
              Free Shipping
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center">
              <img src="./support.png" alt="24/7 Support" />
              <br />
              24/7 Support
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 4 }} />

        {/* Footer */}
        <Typography align="center" variant="h6" gutterBottom>
          <img src="./funiro_logo.png" alt="Funiro Logo" />
        </Typography>
      </Container>
    </>
  );
}

export default Home;
