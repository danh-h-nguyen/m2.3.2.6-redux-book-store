import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService";

// Async Thunks
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (query = "", { rejectWithValue }) => {
    try {
      const res = await api.get(`/books${query}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookDetail = createAsyncThunk(
  "books/fetchBookDetail",
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/books/${bookId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReadingList = createAsyncThunk(
  "books/fetchReadingList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/favorites`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToReadingList = createAsyncThunk(
  "books/addToReadingList",
  async (book, { rejectWithValue }) => {
    try {
      await api.post(`/favorites`, book);
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromReadingList = createAsyncThunk(
  "books/removeFromReadingList",
  async (bookId, { rejectWithValue }) => {
    try {
      await api.delete(`/favorites/${bookId}`);
      return bookId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    bookDetail: null,
    readingList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch book detail
      .addCase(fetchBookDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetail = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch reading list
      .addCase(fetchReadingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadingList.fulfilled, (state, action) => {
        state.loading = false;
        state.readingList = action.payload;
      })
      .addCase(fetchReadingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to reading list
      .addCase(addToReadingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        state.loading = false;
        state.readingList.push(action.payload);
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from reading list
      .addCase(removeFromReadingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromReadingList.fulfilled, (state, action) => {
        state.loading = false;
        state.readingList = state.readingList.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(removeFromReadingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
