import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genre: null,
  },
  reducers: {
    selectGenre: (state, action) => {
      state.genre = action.payload;
    },
    removeGenre: (state) => {
      state.genre = null;
    },
  },
});

export const { selectGenre, removeGenre } = genreSlice.actions;
export default genreSlice.reducer;