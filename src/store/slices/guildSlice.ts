import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guild } from '@/types/game';

interface GuildState {
  guild: Guild | null;
  memberRole: 'member' | 'officer' | 'leader' | null;
}

const initialState: GuildState = {
  guild: null,
  memberRole: null,
};

const guildSlice = createSlice({
  name: 'guild',
  initialState,
  reducers: {
    joinGuild: (state, action: PayloadAction<Guild>) => {
      state.guild = action.payload;
      state.memberRole = 'member';
    },
    leaveGuild: (state) => {
      state.guild = null;
      state.memberRole = null;
    },
    setMemberRole: (
      state,
      action: PayloadAction<'member' | 'officer' | 'leader'>
    ) => {
      state.memberRole = action.payload;
    },
    contributeTreasury: (
      state,
      action: PayloadAction<{ mithril: number; coins: number }>
    ) => {
      if (state.guild) {
        state.guild.treasury.mithril += action.payload.mithril;
        state.guild.treasury.coins += action.payload.coins;
      }
    },
  },
});

export const { joinGuild, leaveGuild, setMemberRole, contributeTreasury } =
  guildSlice.actions;

export default guildSlice.reducer;
