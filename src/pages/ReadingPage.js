import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReadingList,
  removeFromReadingList,
} from "../features/books/bookSlice";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    readingList: books,
    loading,
    error,
  } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchReadingList());
  }, [dispatch]);

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleRemoveBook = (bookId) => {
    dispatch(removeFromReadingList(bookId));
    toast.success("The book has been removed");
  };

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Reading List
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {books.map((book) => (
            <Card
              key={book.id}
              sx={{ width: "12rem", height: "27rem", marginBottom: "2rem" }}
            >
              <CardActionArea onClick={() => handleClickBook(book.id)}>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {book.title}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {book.author}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveBook(book.id);
                    }}
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
