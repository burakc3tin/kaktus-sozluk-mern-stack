// entrySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    const response = await axios.get('https://kaktus-sozluk-mern-stack-1.onrender.com/api/entries');
    return response.data;
  }
);

const entrySlice = createSlice({
  name: 'entries',
  initialState: {
    entries: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    randomizeEntries: (state) => {
      state.entries = state.entries.sort(() => Math.random() - 0.5);
    },
    selectTodaysEntries: (state) => {
        // const today = getTodayDate();
        //   state.entries = state.entries.filter(entry => entry.date === today);
        const today = new Date().toISOString().split('T')[0]; // Bugünün tarihini al
        state.entries = state.entries.filter(entry => entry.createdAt.startsWith(today));
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

 

export const { randomizeEntries, selectTodaysEntries } = entrySlice.actions;

export default entrySlice.reducer;
