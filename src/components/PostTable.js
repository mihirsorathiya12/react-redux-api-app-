import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";

const PostTable = ({ onEdit, onDeleteConfirm }) => {
  const dispatch = useDispatch();
  const { posts = [], loading } = useSelector((state) => state.posts);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Calories</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Fat</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(posts || [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell align="right">{post.calories || 0}</TableCell>
                    <TableCell align="right">{post.fat || 0}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => onEdit(post)}
                        color="primary"
                        aria-label="edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => onDeleteConfirm(post.id)}
                        color="secondary"
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={posts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5]}
          />
        </TableContainer>
      )}
    </>
  );
};

export default PostTable;
