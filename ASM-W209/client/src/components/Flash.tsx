import { Alert, Snackbar, styled } from "@mui/material";

type FlashProps = {
  isShow: boolean;
};

const StyledAlert = styled(Alert)(() => ({
  minWidth: "300px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "500",
}));

function FlashDelete({ isShow }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={() => {}}
      autoHideDuration={1000}
      sx={{
        top: "20px",
        right: "20px",
      }}
    >
      <StyledAlert severity="success">Successfully deleted</StyledAlert>
    </Snackbar>
  );
}

function FlashtAdd({ isShow }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={() => {}}
      autoHideDuration={1000}
      sx={{
        top: "20px",
        right: "20px",
      }}
    >
      <StyledAlert severity="success">Successfully add product</StyledAlert>
    </Snackbar>
  );
}
function FlashtUpdate({ isShow }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={() => {}}
      autoHideDuration={1000}
      sx={{
        top: "20px",
        right: "20px",
      }}
    >
      <StyledAlert severity="success">Successfully edit product</StyledAlert>
    </Snackbar>
  );
}

export { FlashDelete, FlashtAdd, FlashtUpdate };
