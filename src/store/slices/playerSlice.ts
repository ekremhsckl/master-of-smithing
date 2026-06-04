import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, Resource, PlayerStats } from '@/types/game';

const initialResource: Resource = {
  mithril: 100,
  coins: 500,
  diamonds: 10,
  enhancementStones: 5,
  petEggs: 2,
};

const initialStats: PlayerStats = {
  level: 1,
  experience: 0,
  totalDamageDealt: 0,
  totalBattlesWon: 0,
  totalBattlesLost: 0,
  playtime: 0,
};

const initialPlayer: Player = {
  id: 'player_1',
  name: 'Smith',
  level: 1,
  experience: 0,
  resources: initialResource,
  stats: initialStats,
  inventory: {
    maxSlots: 20,
    items: [],
  },
  pets: [],
  activeTeam: [],
  guildId: null,
  createdAt: Date.now(),
  lastPlayedAt: Date.now(),
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayer,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addExperience: (state, action: PayloadAction<number>) => {
      state.experience += action.payload;
      const expPerLevel = 1000;
      while (state.experience >= expPerLevel) {
        state.level += 1;
        state.experience -= expPerLevel;
      }
    },
    addResources: (state, action: PayloadAction<Partial<Resource>>) => {
      state.resources = { ...state.resources, ...action.payload };
    },
    spendResources: (state, action: PayloadAction<Partial<Resource>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value && key in state.resources) {
          const resourceKey = key as keyof Resource;
          state.resources[resourceKey] = Math.max(
            0,
            state.resources[resourceKey] - value
          );
        }
      });
    },
    updateStats: (state, action: PayloadAction<Partial<PlayerStats>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    setLastPlayedAt: (state) => {
      state.lastPlayedAt = Date.now();
    },
  },
});

export const {
  setPlayerName,
  addExperience,
  addResources,
  spendResources,
  updateStats,
  setLastPlayedAt,
} = playerSlice.actions;

export default playerSlice.reducer;
