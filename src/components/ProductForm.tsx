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
  Typography,
  Box,
  Paper,
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
    if (!title) errors.title = "Cần nhập tiêu đề";
    if (title && title.length < 6) errors.title = "Cần nhập tối thiểu 6 ký tự";
    if (!image) errors.image = "Cần nhập hình ảnh";
    if (!category) errors.category = "Cần nhập danh mục";
    if (!price) errors.price = "Cần nhập giá";
    return errors;
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "2rem",
        width: "800px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "2rem",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom></Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Title"
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field
                  name="image"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Image"
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field<string>
                  name="description"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Description"
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field<number>
                  name="price"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label="Price"
                      messageError={meta.touched && meta.error}
                      type="number"
                    />
                  )}
                />
                <Field<string>
                  name="isShow"
                  type="checkbox"
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Show Product"
                    />
                  )}
                />
                <Field<string>
                  name="category"
                  render={({ input, meta }) => (
                    <FormControl fullWidth error={meta.touched && !!meta.error}>
                      <InputLabel>Category</InputLabel>
                      <Select label="Category" {...input}>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value={"669878459994fa10dc1b222f"}>
                          Thời trang
                        </MenuItem>
                        <MenuItem value={"669878549994fa10dc1b2231"}>
                          Phụ kiện
                        </MenuItem>
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting || pristine}
                  sx={{
                    padding: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          )}
        />
      </Paper>
    </Box>
  );
}

export default ProductForm;
