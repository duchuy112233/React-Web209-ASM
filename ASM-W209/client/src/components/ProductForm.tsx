import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { ProductFormParams } from "src/types/Product";
import { InputText } from "./elements/InputText";

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: any;
};

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const validate = (values: ProductFormParams) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Cần nhập title vào";
    if (title && title.length < 6)
      errors.title = "Cần nhập tối thiểu 6 ký tự vào";
    if (!image) errors.image = "Cần nhập image vào";
    if (!category) errors.category = "Cần nhập category vào";
    if (!price) errors.price = "Cần nhập price vào";
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ values }) => {
        return (
          <Stack>
            <Field
              name="title"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Title"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name="image"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Image"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<string>
              name="description"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Description"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<number>
              name="price"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Price"}
                  messageError={meta.touched && meta.error}
                  type="number"
                />
              )}
            />
            <Field<string>
              name="isShow"
              type="checkbox"
              render={({ input, meta }) => {
                return (
                  <FormControlLabel
                    control={<Checkbox {...input} />}
                    label="Show Product"
                  />
                );
              }}
            />
            <Field<string>
              name="category"
              render={({ input, meta }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" {...input} error>
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={"66879becbac7f6bdb27eb74f"}>
                        Thoi trang
                      </MenuItem>
                      <MenuItem value={"66879bf9bac7f6bdb27eb751"}>
                        Phu Kien
                      </MenuItem>
                    </Select>
                    {meta.touched && meta.error && (
                      <FormHelperText>{meta.error}</FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />

            <Button type="submit" onClick={() => onSubmit(values)}>
              Submit
            </Button>
          </Stack>
        );
      }}
    />
  );
}

export default ProductForm;
