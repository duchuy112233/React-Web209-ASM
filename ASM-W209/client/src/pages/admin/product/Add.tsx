import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/contexts/loading";
import { ProductFormParams } from "src/types/Product";
import { FlashtAdd } from "src/components/Flash";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

function AdminProductAdd() {
  const [showFlash, setShowFlash] = useState(false);
  const nav = useNavigate();
  const { setLoading } = useLoading();

  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await axios.post("/products", values);
      toast.success("Successfully created product");
      setTimeout(() => {
        nav("/admin/product/list");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <ToastContainer />
        {/* <FlashtAdd isShow={showFlash} /> */}
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            PRODUCT ADD
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
