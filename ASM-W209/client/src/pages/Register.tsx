import { Button, Container, Stack, Typography } from "@mui/material";
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
    if (!username) errors.username = "Username không được để trống";
    if (!email) errors.email = "Email không được để trống";

    if (!password) errors.password = "Password không được để trống";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Password tối thiểu ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    try {
      await axios.post("/auth/register", data);
      nav("/login");
    } catch (error) {}
  };

  return (
    <Container>
      <Typography variant="h2" textAlign={"center"} mb={2}>
        Register
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ values }) => {
          return (
            <Stack gap={2}>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Username"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
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

export default Register;
