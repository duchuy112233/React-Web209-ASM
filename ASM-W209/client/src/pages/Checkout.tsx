import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Banner from "src/components/Banner";
import { useNavigate } from "react-router-dom";
import { useLoading } from "src/contexts/loading";
import axios from "axios";
import { Field, Form } from "react-final-form";
import { InputText } from "src/components/elements/InputText";
import { useCart } from "src/contexts/cart";
import { useMemo, useState } from "react";
import { useUser } from "src/contexts/user";
import { useProductCart } from "src/hooks/useProductCart";

type CheckoutFormParams = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

function Checkout() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { cart } = useCart();
  const { user } = useUser();
  const { getCartUser } = useProductCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const totalPrice = useMemo(
    () =>
      cart?.products.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0
      ) || 0,
    [cart]
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (isSuccess) nav("/");
  };

  const onSubmit = async (values: CheckoutFormParams) => {
    if (!user || !cart?.products.length) return;
    try {
      setLoading(true);
      await axios.post("/orders", {
        ...values,
        products: cart.products,
        user: user._id,
        totalPrice,
      });
      await getCartUser();
      setDialogMessage("Checkout thành công. Bạn có muốn quay về trang chính ?");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setDialogMessage("Có lỗi xảy ra. Vui lòng thử lại .");
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Banner page="Checkout" />
      <Typography variant="h5" textAlign="center" mt={4} mb={2}>
        Tổng số tiền: {formatPrice(totalPrice)}
      </Typography>
      <Container>
        <Form
          onSubmit={onSubmit}
          initialValues={{ payment: "COD" }}
          render={({ handleSubmit, values }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Field name="name">
                  {({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Họ và tên"
                      messageError={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="phone">
                  {({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Số điện thoại"
                      messageError={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="address">
                  {({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Địa chỉ"
                      messageError={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <FormControl>
                  <FormLabel>Hình thức thanh toán</FormLabel>
                  <RadioGroup {...(values as any).payment}>
                    <FormControlLabel
                      value="COD"
                      control={<Radio />}
                      label="Thanh toán khi nhận hàng"
                    />
                    <FormControlLabel
                      value="BANK"
                      control={<Radio />}
                      label="Chuyển khoản ngân hàng"
                    />
                  </RadioGroup>
                </FormControl>
                <StyledButton type="submit" variant="contained">
                  Thanh toán
                </StyledButton>
              </Stack>
            </StyledForm>
          )}
        />
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isSuccess ? " Thông báo " : " Lỗi "}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
          {!isSuccess && (
            <Button onClick={handleCloseDialog} color="secondary">
              Hủy
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Checkout;

const StyledForm = styled("form")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  alignSelf: "center",
  padding: theme.spacing(1.5, 4),
  fontSize: "16px",
  textTransform: "uppercase",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[4],
  },
}));
