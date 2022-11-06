import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';

const initialState = { filters: [], process: 'idle', activeFilter: 'all' };

export const fetchFilters = createAsyncThunk('filters/filtersFetching', async () => {
  const { request } = useHttp();
  return await request('http://localhost:3001/filters');
});

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.process = 'loading';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.process = 'confirm';
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.process = 'error';
        state.filters = [];
      });
  },
});

export default filterSlice.reducer;
export const { setActiveFilter } = filterSlice.actions;
