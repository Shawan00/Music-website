import { createSlice } from '@reduxjs/toolkit'

export const playerControlSlice = createSlice({
  name: 'playerControl',
  initialState: {
    song: null
  },
  reducers: {
    selectSong: (state, action) => {
      state.song = action.payload;
    },
    removeSong: (state) => {
      state.song = null;
    }
  }
})

export const { selectSong, removeSong } = playerControlSlice.actions
export default playerControlSlice.reducer