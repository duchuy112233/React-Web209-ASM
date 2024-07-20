import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

type ConfirmDialogProps = {
  confirm: boolean;
  onConfirm: (confirm: boolean) => void;
  onDelete: () => void;
};

export default function ConfirmDialog({
  confirm,
  onConfirm,
  onDelete,
}: ConfirmDialogProps) {
  const handleClose = () => {
    onConfirm(false);
  };

  const handleAgree = () => {
    onConfirm(false);
    onDelete();
  };

  return (
    <Dialog
      open={confirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Xoá sản phẩm"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có muốn xoá sản phẩm này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose}>Cancel</CancelButton>
        <OkButton onClick={handleAgree} autoFocus>
          OK
        </OkButton>
      </DialogActions>
    </Dialog>
  );
}

const OkButton = styled(Button)({
  background: "linear-gradient(135deg, #ff4081 30%, #ff80ab 90%)",
  borderRadius: 50,
  color: "white",
  height: 40,
  padding: "0 30px",
  boxShadow: "0 4px 20px 0 rgba(255, 105, 135, 0.3)",
  transition: "background 0.3s ease-in-out",
  '&:hover': {
    backgroundColor: '#ff80ab',
  },
});

const CancelButton = styled(Button)({
  backgroundColor: "#444",
  color: "#fff",
  height: 40,
  padding: "0 30px",
  borderRadius: 50,
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.2)",
  transition: "background 0.3s ease-in-out, transform 0.3s ease-in-out",
  '&:hover': {
    backgroundColor: "#666",
    transform: "scale(1.05)",
  },
});
