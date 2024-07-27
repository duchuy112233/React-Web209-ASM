import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Divider,
  Grid,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { Product } from "src/types/Product"; // Ensure Product type is imported correctly
import { useProductCart } from "src/hooks/useProductCart";
import Loading from "src/components/Loading";
function Detail() {
  const { addToCart } = useProductCart();

  const { productId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null); // Initialize product state properly
  const [selectedSize, setSelectedSize] = useState<string>(""); // State for selected size
  const [quantity, setQuantity] = useState<number>(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  /////////////////////////////////////////////////
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };
  const handleQuantityChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue);
    }
  };
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  /////////////////////////////////////////////////////
  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };
  ////////////////////////////////////////////////////
  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <CircularProgress color="primary" style={{ marginBottom: "10px" }} />
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Loading isShow={loading} />
      <Container sx={{ marginTop: "50px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", maxWidth: "500px", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom>
                {product.price.toLocaleString()} đ
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                <Star sx={{ color: "#FFD700", marginRight: 0.5 }} />
                {/* {product.rating} */ 3}
              </Typography>
              |
              <Typography variant="body2" color="text.secondary">
                ( {/* {product.reviews}  */} 1000 reviews)
              </Typography>
            </Box>

            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            {/* /////////////////////////////////////////////////////////////////////////////// */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.8 }}
            >
              Size:
            </Typography>

            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <Tooltip title="Size L">
                <IconButton
                  onClick={() => handleSizeClick("L")}
                  sx={{
                    bgcolor: selectedSize === "L" ? "#2196f3" : "#eeeeee",
                    color: selectedSize === "L" ? "#ffffff" : "#000000",
                    borderRadius: "4px", // Square border radius
                  }}
                >
                  L
                </IconButton>
              </Tooltip>
              <Tooltip title="Size XL">
                <IconButton
                  onClick={() => handleSizeClick("XL")}
                  sx={{
                    bgcolor: selectedSize === "XL" ? "#2196f3" : "#eeeeee",
                    color: selectedSize === "XL" ? "#ffffff" : "#000000",
                    borderRadius: "4px", // Square border radius
                  }}
                >
                  XL
                </IconButton>
              </Tooltip>
              <Tooltip title="Size XS">
                <IconButton
                  onClick={() => handleSizeClick("XS")}
                  sx={{
                    bgcolor: selectedSize === "XS" ? "#2196f3" : "#eeeeee",
                    color: selectedSize === "XS" ? "#ffffff" : "#000000",
                    borderRadius: "4px", // Square border radius
                  }}
                >
                  XS
                </IconButton>
              </Tooltip>
            </Box>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.8 }}
            >
              Color:
            </Typography>

            <Box sx={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <Tooltip title="Red">
                <IconButton sx={{ bgcolor: "#FF8A80" }} />
              </Tooltip>
              <Tooltip title="Green">
                <IconButton sx={{ bgcolor: "#A5D6A7" }} />
              </Tooltip>
              <Tooltip title="Blue">
                <IconButton sx={{ bgcolor: "#81D4FA" }} />
              </Tooltip>
            </Box>
            {/* ///////////////////////////////////////////////////////////////////////////////////// */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.8 }}
            >
              Quantity:
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // Adjust the gap between items for clarity
                }}
              >
                <IconButton
                  onClick={handleDecreaseQuantity}
                  size="small"
                  sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
                >
                  -
                </IconButton>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  inputProps={{ min: 1 }}
                  size="small"
                  fullWidth
                  variant="outlined"
                  sx={{ flex: 1 }} // Ensure the TextField takes up remaining space
                />
                <IconButton
                  onClick={handleIncreaseQuantity}
                  size="small"
                  sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
                >
                  +
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Box>
              <Box sx={{ marginLeft: 1 }}>
                <Button variant="outlined" color="primary">
                  Compare
                </Button>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.3 }}
            >
              SKU:
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.3 }}
            >
              Category:{product.category.name}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.3 }}
            >
              Tags:
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "15px", opacity: 0.3 }}
            >
              Share:
            </Typography>

            {/* ////////////////////////////////////////////////////////////////// */}
          </Grid>

          <Divider sx={{ marginY: 30 }} />
        </Grid>
        <Divider sx={{ marginY: 1 }} />
        {/* Desc section */}
        <Box sx={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: "20px", marginTop: "20px" }}
          >
            Desc
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: "20px", marginTop: "20px" }}
          >
            Review
          </Typography>
        </Box>
        {/* Horizontal images */}
        <Box sx={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <img
            src="https://noithatchungcu24h.com/wp-content/uploads/2016/07/CAM11.jpg"
            alt="Image 1"
            style={{ width: "100%", height: "250px" }}
          />
          <img
            src="https://noithatchungcu24h.com/wp-content/uploads/2016/07/CAM11.jpg"
            alt="Image 2"
            style={{ width: "100%", height: "250px" }}
          />
        </Box>
      </Container>
    </>
  );
}

export default Detail;
