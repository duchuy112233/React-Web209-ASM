import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { Product, ProductFormParams } from "src/types/Product";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();

  const getProduct = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.put(`/products/${id}`, values);
      toast.success("Successfully edited product");
      setTimeout(() => {
        nav("/admin/product/list");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Container>
        <ToastContainer />
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            PRODUCT EDIT
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={product} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductEdit;
