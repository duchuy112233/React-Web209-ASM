import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "src/components/Loading";
import Sidebar from "src/components/Sidebar";
import { useLoading } from "src/contexts/loading";
import { Home } from "@mui/icons-material";

function AdminLayout() {
  const { loading } = useLoading();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      <Loading isShow={loading} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "black",
            textAlign: "left",
            // borderBottom: "1px solid #ff1744", // 1px red bottom border
            // Adjust width as needed
            marginLeft: "280px",
         
          }}
        >
          <h1>Admin</h1>
        </div>
        <div
          style={{
            color: "black",
            textAlign: "right",
            // borderBottom: "1px solid #ff1744", // 1px red bottom border
            // Adjust width as needed
            marginRight: "100px",
         
          }}
        >
          <h1>
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
             - <Home /> - {/* Replace with your home icon component */}
            </a>
          </h1>
        </div>
      </div>
      ;
      {/* /////////////////////// */}
      <Stack direction={"row"} gap={2}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
}

export default AdminLayout;
