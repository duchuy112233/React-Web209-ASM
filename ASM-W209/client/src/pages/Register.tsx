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

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const nav = useNavigate();
  const validate = (values: RegisterFormParams) => {
    const { username, email, password } = values;
    const errors: ValidationErrors = {};

    if (!username) errors.username = "Can nhap username vao";
    if (!email) errors.email = "Can nhap email vao";

    if (!password) errors.password = "Can nhap password vao";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Can nhap password toi thieu ${MIN_PASSWORD} ky tu`;

    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    try {
      await axios.post("/auth/register", data);
      nav("/login");
    } catch (error) {}
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
        Register
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ values }) => (
          <Stack spacing={2}>
            <Field
              name="username"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Username"
                  messageError={meta.touched && meta.error}
                />
              )}
            />
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
              Already have an account?{" "}
              <MuiLink href="/login" variant="body2">
                Login
              </MuiLink>
            </Typography>
          </Stack>
        )}
      />
    </Container>
  );
};

export default Register;
