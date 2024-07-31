import {
  Button,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";
import { useProductCart } from "src/hooks/useProductCart";

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const nav = useNavigate();
  const { getCartUser } = useProductCart();

  const validate = (values: LoginFormParams) => {
    const { email, password } = values;
    const errors: ValidationErrors = {};

    if (!email) errors.email = "Can nhap email vao";

    if (!password) errors.password = "Can nhap password vao";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Can nhap password toi thieu ${MIN_PASSWORD} ky tu`;

    return errors;
  };

  const onSubmit = async (values: LoginFormParams) => {
    try {
      const { data } = await axios.post("/auth/login", values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      getCartUser();
      nav("/");
    } catch (error) {}
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        Login
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ values }) => (
          <Stack spacing={2}>
            <Field
              name="email"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Email"
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name="password"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Password"
                  messageError={meta.touched && meta.error}
                  type="password"
                />
              )}
            />
            <Button variant="contained" onClick={() => onSubmit(values)}>
              Submit
            </Button>
            <Typography variant="body2" textAlign="center">
              Don't have an account?{" "}
              <MuiLink href="/register" variant="body2">
                Register
              </MuiLink>
            </Typography>
          </Stack>
        )}
      />
    </Container>
  );
};

export default Login;
