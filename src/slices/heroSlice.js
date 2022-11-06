import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/http.hook';
import { nanoid } from '@reduxjs/toolkit';

const initialState = { heroes: [], process: 'idle' };

export const fetchHeroes = createAsyncThunk('heroes/heroesFetching', async () => {
  const { request } = useHttp();
  return await request('http://localhost:3001/heroes');
});

export const postHero = createAsyncThunk(
  'heroes/heroPost',
  async ({ heroName, heroDescr, heroElement }, { dispatch }) => {
    const { request } = useHttp();
    const heroObj = {
      id: nanoid(),
      name: `${heroName}`,
      description: `${heroDescr}`,
      element: `${heroElement}`,
    };
    await request('http://localhost:3001/heroes', 'POST', JSON.stringify(heroObj));
    dispatch(fetchHeroes());
  },
);

export const deleteHero = createAsyncThunk('heroes/heroDelete', async (id, { dispatch }) => {
  const { request } = useHttp();
  await request(`http://localhost:3001/heroes/${id}`, 'DELETE');
  dispatch(fetchHeroes());
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.process = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.process = 'confirm';
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.process = 'error';
        state.heroes = [];
      });
  },
});

export default heroesSlice.reducer;
