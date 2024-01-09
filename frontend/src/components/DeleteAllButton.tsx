import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  bgcolor: "#000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteAllButton({ onClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        Delete all
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="grid gap-10">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center text-red-800"
          >
            <h1 className="font-bold">Confirm to delete all todos?</h1>
          </Typography>
          <Typography
            id="modal-modal-description"
            className="flex justify-around"
          >
            <Button variant="outlined" color="error" onClick={onClick}>
              Confirm
            </Button>
            <Button variant="outlined" onClick={() => handleClose()}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
