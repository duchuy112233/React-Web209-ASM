import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container sx={{ textAlign: "center", mb: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Typography variant="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Sorry, the page you are looking for does not exist or has been moved.
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" size="large">
            Go to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default NotFound;
