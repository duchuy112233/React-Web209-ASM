import { styled } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import { useLoading } from "src/contexts/loading";
import { useProductCart } from "src/hooks/useProductCart";

function ClientLayout() {
  const { loading } = useLoading();
  const { getCartUser } = useProductCart();

  useEffect(() => {
    getCartUser();
  }, []);

  return (
    <>
      <Loading isShow={loading} />
      <Header />
      <Spacer />
      <Outlet />
      <Spacer />
      <Footer />
    </>
  );
}

export default ClientLayout;
const Spacer = styled("div")({
  height: 100, 
});
