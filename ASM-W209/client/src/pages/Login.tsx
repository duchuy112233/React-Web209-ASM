import { Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";

type LoginFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const validate = (values: LoginFormParams) => {
    const { email, password } = values;
    const errors: ValidationErrors = {};
    if (!email) errors.email = "Cần nhập email vào ";

    if (!password) errors.password = "Cần nhập password vào";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Cần nhập password tối thiểu ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (values: LoginFormParams) => {
    try {
      const { data } = await axios.post("/auth/login", values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // luu object
    } catch (error) {}
  };

  return (
    <Container>
      <Typography variant="h2" textAlign={"center"} mb={2}>
        Login
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ values }) => {
          return (
            <Stack gap={2}>
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Email"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Password"}
                    messageError={meta.touched && meta.error}
                    type="password"
                  />
                )}
              />
              <Button variant="contained" onClick={() => onSubmit(values)}>
                Submit
              </Button>
            </Stack>
          );
        }}
      />
    </Container>
  );
};

export default Login;
