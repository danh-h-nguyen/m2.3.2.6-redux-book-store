import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetail, addToReadingList } from "../features/books/bookSlice";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const {
    bookDetail: book,
    loading,
    error,
  } = useSelector((state) => state.books);
  const { id: bookId } = useParams();

  useEffect(() => {
    dispatch(fetchBookDetail(bookId));
  }, [dispatch, bookId]);

  const handleAddToReadingList = () => {
    dispatch(addToReadingList(book));
    toast.success("The book has been added to the reading list!");
  };

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : book ? (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            <img
              width="100%"
              src={`${BACKEND_API}/${book.imageLink}`}
              alt={book.title}
            />
          </Grid>
          <Grid item md={8}>
            <Stack>
              <Typography variant="h4">{book.title}</Typography>
              <Typography variant="body1">
                <strong>Author:</strong> {book.author}
              </Typography>
              <Typography variant="body1">
                <strong>Year:</strong> {book.year}
              </Typography>
              <Typography variant="body1">
                <strong>Country:</strong> {book.country}
              </Typography>
              <Typography variant="body1">
                <strong>Pages:</strong> {book.pages}
              </Typography>
              <Typography variant="body1">
                <strong>Language:</strong> {book.language}
              </Typography>
              <Button
                variant="outlined"
                sx={{ width: "fit-content" }}
                onClick={handleAddToReadingList}
              >
                Add to Reading List
              </Button>
            </Stack>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
};

export default BookDetailPage;
