import { configureStore } from '@reduxjs/toolkit'
import playerControlReducer from '../features/playerControl/playerControlSlice'

export const store = configureStore({
  reducer: {
    playerControl: playerControlReducer
  },
})