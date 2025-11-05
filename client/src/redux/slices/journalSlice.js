// store/journalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get JWT token from cookie
const getToken = () => {
  return document.cookie
    ?.split("; ")
    ?.find((c) => c.startsWith("token="))
    ?.split("=")[1];
};

// ------------------- Async Thunks -------------------

// Fetch all journals
export const fetchJournals = createAsyncThunk(
  "journal/fetchJournals",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get("http://localhost:5000/api/journal/", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data; // returns array of journals
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Fetch single journal by ID
export const fetchJournal = createAsyncThunk(
  "journal/fetchJournal",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get(`http://localhost:5000/api/journal/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data; // returns single journal
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ------------------- Slice -------------------
const journalSlice = createSlice({
  name: "journal",
  initialState: {
    journals: [],
    currentJournal: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentJournal: (state) => {
      state.currentJournal = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all journals
    builder.addCase(fetchJournals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJournals.fulfilled, (state, action) => {
      state.loading = false;
      state.journals = action.payload;
    });
    builder.addCase(fetchJournals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch single journal
    builder.addCase(fetchJournal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.currentJournal = null;
    });
    builder.addCase(fetchJournal.fulfilled, (state, action) => {
      state.loading = false;
      state.currentJournal = action.payload;
    });
    builder.addCase(fetchJournal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentJournal = null;
    });
  },
});

export const { clearCurrentJournal } = journalSlice.actions;
export default journalSlice.reducer;
