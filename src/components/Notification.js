import { Snackbar } from "@mui/material";

const Notification = ({ open, message, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    message={message}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  />
);

export default Notification;
