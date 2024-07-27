import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
  } from "@mui/material";
  import Banner from "src/components/Banner";
  import { useNavigate } from "react-router-dom";
  import { useLoading } from "src/contexts/loading";
  import axios from "axios";
  import { Field, Form } from "react-final-form";
  import { InputText } from "src/components/elements/InputText";
  import { useCart } from "src/contexts/cart";
  import { useMemo } from "react";
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
  
    const totalPrice = useMemo(
      () =>
        cart
          ? cart.products.reduce(
              (total, { product, quantity }) => total + product.price * quantity,
              0
            )
          : 0,
      [cart]
    );
  
    const onSubmit = async (values: CheckoutFormParams) => {
      if (!user || !cart || !cart?.products.length) return;
      try {
        setLoading(true);
        await axios.post("/orders", {
          ...values,
          products: cart.products,
          user: user._id,
          totalPrice,
        });
        await getCartUser();
        alert("Checkout thank cong");
        nav("/");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    return (
      <>
        <Banner page="Checkout" />
        {/* Tieu de */}
        <Typography   textAlign={"center"} mt={2}>
          Total Pirce : {totalPrice} VND
        </Typography>
        <Container sx={{ mb: 10 }}>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              payment: "COD",
            }}
            render={({ values }) => {
              return (
                <Stack gap={3}>
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <InputText
                        input={input}
                        label={"Name"}
                        messageError={meta.touched && meta.error}
                      />
                    )}
                  />
                  <Field
                    name="phone"
                    render={({ input, meta }) => (
                      <InputText
                        input={input}
                        label={"Phone"}
                        messageError={meta.touched && meta.error}
                      />
                    )}
                  />
                  <Field
                    name="address"
                    render={({ input, meta }) => (
                      <InputText
                        input={input}
                        label={"Address"}
                        messageError={meta.touched && meta.error}
                      />
                    )}
                  />
                  <Field<string>
                    name="payment"
                    render={({ input }) => {
                      return (
                        <FormControl>
                          <FormLabel> Payment</FormLabel>
                          <RadioGroup {...input}>
                            <FormControlLabel
                              value="COD"
                              control={<Radio />}
                              label="COD"
                            />
                            <FormControlLabel
                              value="BANK"
                              control={<Radio />}
                              label="BANK"
                            />
                          </RadioGroup>
                        </FormControl>
                      );
                    }}
                  />
                  <Button variant="contained" onClick={() => onSubmit(values)}>
                    Submit
                  </Button>
                </Stack>
              );
            }}
          />
        </Container>
      </>
    );
  }
  
  export default Checkout;