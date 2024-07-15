import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Divider, Grid, Button } from "@mui/material";
import { Product } from "src/types/Product"; // Ensure Product type is imported correctly

function Detail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null); // Initialize product state properly

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ marginTop: '50px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <img src={product.image} alt={product.title} style={{ width: 500, height:300 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.price.toLocaleString()} đ
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Detail;
