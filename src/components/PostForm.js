import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const PostForm = ({
  open,
  handleClose,
  handleSubmit,
  postToEdit,
  handleDelete,
}) => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setCalories(postToEdit.calories || "");
      setFat(postToEdit.fat || "");
    } else {
      setTitle("");
      setCalories("");
      setFat("");
    }
  }, [postToEdit]);

  const onSubmit = () => {
    handleSubmit({ ...postToEdit, title, calories, fat });
    handleClose();
  };

  const onDelete = () => {
    if (postToEdit && postToEdit.id) {
      handleDelete(postToEdit.id); // Assuming the delete action takes post id
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{postToEdit ? "Edit Post" : "Add Post"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Calories"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Fat"
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        {postToEdit && (
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        )}
        <Button onClick={onSubmit} variant="contained" color="primary">
          {postToEdit ? "Update" : "Add"}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
