import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Banner from "src/components/Banner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "src/contexts/cart";
import { useProductCart } from "src/hooks/useProductCart";
import { Link } from "react-router-dom";

const labels = ["Sản Phẩm", "Giá", "Số lượng", "Tổng"];

function Cart() {
  const { cart } = useCart();
  const { removeToCart } = useProductCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Tính tổng số lượng của tất cả các sản phẩm trong giỏ hàng
  const getCartTotalQuantity = () => {
    return cart?.products.reduce((acc, item) => acc + item.quantity, 0) || 0;
  };

  // Tính tổng giá trị của tất cả các sản phẩm trong giỏ hàng
  const getCartTotal = () => {
    return (
      cart?.products.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <>
      <Banner page="Cart" />
      {/* Tiêu đề */}
      <Container>
        <Wrapper>
          <LabelWrapper
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={2}
          >
            {labels.map((label, index) => (
              <Typography
                key={index}
                fontWeight={500}
                variant="h6"
                color="textSecondary"
                sx={{ flex: 1, textAlign: "center" }} 
              >
                {label}
              </Typography>
            ))}
          </LabelWrapper>
          {/* Cart Item */}
          <Stack gap={2} my={3}>
            {cart?.products.map((item, index) => (
              <Stack
                key={index}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={2}
                padding={1}
                borderBottom="1px solid #ddd"
                sx={{ overflow: "hidden" }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  sx={{ flex: 1 }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    width={"100px"}
                    style={{
                      borderRadius: "8px",
                      maxHeight: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography
                    fontWeight={500}
                    sx={{
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal", 
                      wordBreak: "break-word", 
                    }}
                  >
                    {item.product.title}
                  </Typography>
                </Stack>

                <Typography
                  fontWeight={500}
                  sx={{ flex: 1, textAlign: "center" }}
                >
                  {formatPrice(item.product.price)}
                </Typography>
                <Typography
                  fontWeight={500}
                  sx={{ flex: 1, textAlign: "center" }}
                >
                  {item.quantity}
                </Typography>
                <Typography
                  fontWeight={500}
                  sx={{ flex: 1, textAlign: "center" }}
                >
                  {formatPrice(item.product.price * item.quantity)}
                </Typography>
                <IconButton onClick={() => removeToCart(item.product._id)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          {/* Hàng tổng kết */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            padding={2}
            borderTop="1px solid #ddd"
          >
            <Typography variant="h6" fontWeight={500}>
              Tổng số tiền :{" "}
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
                sx={{ ml: 1, fontSize: "1rem", fontWeight: 400 }}
              >
                ( {getCartTotalQuantity()} sản phẩm )
              </Typography>
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              {formatPrice(getCartTotal())}
            </Typography>
          </Stack>
        </Wrapper>
        <Stack alignItems={"center"} >
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <StyledButton variant="contained" color="primary">
              Checkout
            </StyledButton>
          </Link>
        </Stack>
      </Container>
    </>
  );
}

export default Cart;

const Wrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(9),
}));

const LabelWrapper = styled(Stack)(({ theme }) => ({
  background: "#F9F1E7",
  height: 55,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
  flexDirection: "row",
  alignItems: "center",
  "& > *": {
    flex: 1,
    textAlign: "center",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  textTransform: "uppercase",
  boxShadow: theme.shadows[3],
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[6],
  },
}));
