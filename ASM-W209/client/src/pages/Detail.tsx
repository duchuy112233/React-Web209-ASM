import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { Product } from "src/types/Product";
import { useProductCart } from "src/hooks/useProductCart";
import Loading from "src/components/Loading";

function Detail() {
  const { addToCart } = useProductCart();
  const { productId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  
  const nav = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
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

  const handleSizeClick = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) setQuantity(parsedValue);
  };
  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      addToCart({ product, quantity });
      setOpenDialog(true);
    }
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const handleGoToCart = () => {
    setOpenDialog(false);
    nav('/cart');
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <CircularProgress color="primary" sx={{ mb: 1 }} />
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Loading isShow={loading} />
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", maxWidth: "500px", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">{product.price.toLocaleString()} đ</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                <Star sx={{ color: "#FFD700", mr: 0.5 }} /> 3
              </Typography>
              |
              <Typography variant="body2" color="text.secondary">(1000 reviews)</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>{product.description}</Typography>
            
            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.8 }}>Size:</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              {["L", "XL", "XS"].map(size => (
                <Tooltip key={size} title={`Size ${size}`}>
                  <IconButton
                    onClick={() => handleSizeClick(size)}
                    sx={{
                      bgcolor: selectedSize === size ? "#2196f3" : "#eeeeee",
                      color: selectedSize === size ? "#ffffff" : "#000000",
                      borderRadius: 1,
                    }}
                  >
                    {size}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.8 }}>Color:</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              {["#FF8A80", "#A5D6A7", "#81D4FA"].map(color => (
                <Tooltip key={color} title={`Color ${color}`}>
                  <IconButton sx={{ bgcolor: color }} />
                </Tooltip>
              ))}
            </Box>

            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.8 }}>Quantity:</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={handleDecreaseQuantity} size="small" sx={{ border: "1px solid #ccc", borderRadius: 1 }}>-</IconButton>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  inputProps={{ min: 1 }}
                  size="small"
                  fullWidth
                  variant="outlined"
                />
                <IconButton onClick={handleIncreaseQuantity} size="small" sx={{ border: "1px solid #ccc", borderRadius: 1 }}>+</IconButton>
              </Box>
              <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
              <Button variant="outlined" color="primary" sx={{ ml: 1 }}>Compare</Button>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.3 }}>SKU:</Typography>
            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.3 }}>Category: {product.category.name}</Typography>
            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.3 }}>Tags:</Typography>
            <Typography variant="h6" gutterBottom sx={{ fontSize: "15px", opacity: 0.3 }}>Share:</Typography>
          </Grid>

          <Divider sx={{ my: 6 }} />
        </Grid>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ fontSize: "20px", mt: 2 }}>Desc</Typography>
          <Typography variant="h6" sx={{ fontSize: "20px", mt: 2 }}>Review</Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sản phẩm đã được thêm vào giỏ hàng</DialogTitle>
        <DialogContent>
          <Typography>Bạn có muốn đi đến giỏ hàng hoặc hủy bỏ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoToCart} color="primary">Đi đến giỏ hàng</Button>
          <Button onClick={handleCloseDialog} color="secondary">Hủy bỏ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Detail;
