import { FC } from "react";
import { Typography } from "@mui/material";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";
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
type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
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
  );
};

export default ProductCard;
