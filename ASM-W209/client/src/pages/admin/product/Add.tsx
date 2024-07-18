import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/contexts/loading";
import { ProductFormParams } from "src/types/Product";
import Flash from "src/components/Flash";
import { useState } from "react";
function AdminProductAdd() {
   const [showFlash, setShowFlash] = useState(false);
  const nav = useNavigate();
  const { setLoading } = useLoading();

  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await axios.post("/products", values);
      setShowFlash(true); // Show flash message after successful submit
      setTimeout(() => {
        nav("/admin/product/list");
      }, 1000);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
      <Flash isShow={showFlash} />
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Add Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
