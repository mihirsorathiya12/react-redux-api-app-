import React, { useState } from "react";
import PostTable from "./components/PostTable";
import PostForm from "./components/PostForm";
import ConfirmDialog from "./components/ConfirmDialog";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { addPost, updatePost, deletePost } from "./features/posts/postSlice";
import { Button, Container, Typography } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [notify, setNotify] = useState({ open: false, message: "" });

  const handleFormSubmit = (post) => {
    if (post.id) {
      dispatch(updatePost(post));
      setNotify({ open: true, message: "Post updated!" });
    } else {
      dispatch(addPost(post));
      setNotify({ open: true, message: "Post added!" });
    }
  };

  const handleDeleteConfirm = () => {
    dispatch(deletePost(deleteId));
    setDeleteId(null);
    setNotify({ open: true, message: "Post deleted!" });
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Post Management
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setFormOpen(true);
          setSelectedPost(null);
        }}
      >
        ● Add New Post
      </Button>

      <PostTable
        onEdit={(post) => {
          setSelectedPost(post);
          setFormOpen(true);
        }}
        onDeleteConfirm={(id) => setDeleteId(id)}
      />

      <PostForm
        open={formOpen}
        handleClose={() => setFormOpen(false)}
        handleSubmit={handleFormSubmit}
        postToEdit={selectedPost}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Notification
        open={notify.open}
        message={notify.message}
        onClose={() => setNotify({ open: false, message: "" })}
      />
    </Container>
  );
}

export default App;
