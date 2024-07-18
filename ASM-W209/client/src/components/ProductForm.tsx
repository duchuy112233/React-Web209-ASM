import React from "react";
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
import { ProductFormParams, Category } from "src/types/Product";
import { InputText } from "./elements/InputText";
import useCategories from "src/pages/admin/hook/category";

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
    if (!image) errors.image = "Cần nhập ảnh";
    if (!category) errors.category = "Cần nhập danh mục";
    if (!price) errors.price = "Cần nhập giá";
    return errors;
  };

  const { categories, loading, error } = useCategories();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, values }) => {
        return (
          <Stack component="form" onSubmit={handleSubmit} spacing={2}>
            <Field
              name="title"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Tiêu đề"
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name="image"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Ảnh"
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<string>
              name="description"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Mô tả"
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<number>
              name="price"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label="Giá"
                  messageError={meta.touched && meta.error}
                  type="number"
                />
              )}
            />
            <Field<string>
              name="isShow"
              type="checkbox"
              render={({ input, meta }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label="Hiển thị sản phẩm"
                />
              )}
            />
            <Field<string>
              name="category"
              render={({ input, meta }) => (
                <FormControl fullWidth error={meta.touched && !!meta.error}>
                  <InputLabel>Danh mục</InputLabel>
                  <Select native label="Danh mục" {...input}>
                    <option value=""></option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                  {meta.touched && meta.error && (
                    <FormHelperText>{meta.error}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Button type="submit">Gửi</Button>
          </Stack>
        );
      }}
    />
  );
}

export default ProductForm;
