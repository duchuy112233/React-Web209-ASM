import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <Divider sx={{ marginY: 15 }} />
      <Box sx={{ bgcolor: "#f0f0f0", py: 3 }}>
        <Typography align="center" variant="h6" gutterBottom>
          <img
            src="./public/LogoFur.jpg"
            alt="Furniro Logo"
            style={{ width: "150px", marginBottom: "10px" }}
          />
        </Typography>
        <Typography align="center" variant="body2" color="text.secondary">
          Địa chỉ: Số 123, Đường ABC, Thành phố XYZ
          <br />
          Email: contact@furniro.com | Điện thoại: (+84) 123 456 789
        </Typography>
      </Box>
      <Divider sx={{ marginY: 1 }} />
      <Box sx={{ bgcolor: "#f0f0f0", py: 3 }}>
   
        <Typography align="center" variant="body2" color="text.secondary">
          FURNIRO
       
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
