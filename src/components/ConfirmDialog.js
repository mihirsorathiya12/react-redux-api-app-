import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Are you sure you want to delete?</DialogTitle>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
