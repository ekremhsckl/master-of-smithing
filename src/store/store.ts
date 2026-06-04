import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import inventoryReducer from './slices/inventorySlice';
import petReducer from './slices/petSlice';
import battleReducer from './slices/battleSlice';
import questReducer from './slices/questSlice';
import guildReducer from './slices/guildSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    inventory: inventoryReducer,
    pet: petReducer,
    battle: battleReducer,
    quest: questReducer,
    guild: guildReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
