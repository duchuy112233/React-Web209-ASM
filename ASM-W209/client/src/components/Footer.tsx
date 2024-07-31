import { Box, Divider, Typography, Container } from "@mui/material";

const FooterLogo = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      FURNIRO
    </Typography>
  </Box>
);

const ContactInfo = () => (
  <Typography align="center" variant="body2" color="text.secondary">
    Địa chỉ: Số 123, Đường ABC, Thành phố XYZ
    <br />
    Email: contact@furniro.com | Điện thoại: (+84) 123 456 789
  </Typography>
);

const FooterBottom = () => (
  <Typography align="center" variant="body2" color="text.secondary">
    &copy; {new Date().getFullYear()} FURNIRO. All rights reserved.
  </Typography>
);

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f0f0f0" }}>
      <Container>
        <Divider sx={{ my: 3 }} />
        <FooterLogo />
        <ContactInfo />
        <Divider sx={{ my: 1 }} />
        <FooterBottom />
      </Container>
    </Box>
  );
};

export default Footer;
