import { createSlice } from '@reduxjs/toolkit';

export const playerControlSlice = createSlice({
  name: 'playerControl',
  initialState: {
    song: null,
    playedHistory: [],
    nextSongs: [],
  },
  reducers: {
    selectSong: (state, action) => {
      if (state.song?._id === action.payload._id) return;
      if (state.song) {
        state.playedHistory = [...state.playedHistory, state.song].slice(-10);
      }
      state.song = action.payload;
    },
    removeSong: (state) => {
      state.song = null;
      state.playedHistory = [];
      state.nextSongs = [];
    },
    addSongToQueue: (state, action) => {
      if (!state.song) {
        state.song = action.payload;
        return;
      }
      state.nextSongs.push(action.payload);
      if (state.nextSongs.length > 30) state.nextSongs.shift();
    },
    playPlaylist: (state, action) => {
      const [firstSong, ...rest] = action.payload;
      if (state.song) {
        state.playedHistory = [...state.playedHistory, state.song].slice(-10);
      }
      state.song = firstSong;
      state.nextSongs = rest;
    },
    playNextSong: (state) => {
      if (state.nextSongs.length > 0) {
        state.playedHistory = [...state.playedHistory, state.song].slice(-10);
        state.song = state.nextSongs[0];
        state.nextSongs = state.nextSongs.slice(1);
      }
    },
    playPrevSong: (state) => {
      if (state.playedHistory.length > 0) {
        const prevSong = state.playedHistory[state.playedHistory.length - 1];
        state.nextSongs = [state.song, ...state.nextSongs];
        state.song = prevSong;
        state.playedHistory = state.playedHistory.slice(0, -1);
      }
    },
    playFromNextSongs: (state, action) => {
      if (action.payload >= 0 && action.payload < state.nextSongs.length) {
        state.song = state.nextSongs[action.payload]
        state.nextSongs.splice(action.payload, 1)
      }
    },
    playFromHistory:  (state, action) => {
      if (action.payload >= 0 && action.payload < state.playedHistory.length) {
        state.song = state.playedHistory[action.payload]
        state.playedHistory.splice(action.payload, 1)
      }
    }
  },
});

export const {
  selectSong,
  removeSong,
  addSongToQueue,
  playPlaylist,
  playNextSong,
  playPrevSong,
  playFromNextSongs,
  playFromHistory
} = playerControlSlice.actions;

export default playerControlSlice.reducer;