import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BattleState, BattleReward } from '@/types/game';

const initialState: BattleState = {
  playerHp: 100,
  playerMaxHp: 100,
  playerMana: 50,
  playerMaxMana: 50,
  enemies: [],
  turn: 0,
  isPlayerTurn: true,
  battleLog: [],
  isActive: false,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    startBattle: (state) => {
      state.isActive = true;
      state.turn = 0;
      state.isPlayerTurn = true;
      state.battleLog = ['Battle started!'];
    },
    endBattle: (state, action: PayloadAction<BattleReward | undefined>) => {
      state.isActive = false;
      if (action.payload) {
        state.reward = action.payload;
      }
    },
    damagePlayer: (state, action: PayloadAction<number>) => {
      state.playerHp = Math.max(0, state.playerHp - action.payload);
      state.battleLog.push(`Player took ${action.payload} damage!`);
    },
    healPlayer: (state, action: PayloadAction<number>) => {
      state.playerHp = Math.min(state.playerMaxHp, state.playerHp + action.payload);
      state.battleLog.push(`Player healed for ${action.payload} HP!`);
    },
    useMana: (state, action: PayloadAction<number>) => {
      state.playerMana = Math.max(0, state.playerMana - action.payload);
    },
    restoreMana: (state, action: PayloadAction<number>) => {
      state.playerMana = Math.min(state.playerMaxMana, state.playerMana + action.payload);
    },
    nextTurn: (state) => {
      state.turn += 1;
      state.isPlayerTurn = !state.isPlayerTurn;
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.battleLog.push(action.payload);
    },
  },
});

export const {
  startBattle,
  endBattle,
  damagePlayer,
  healPlayer,
  useMana,
  restoreMana,
  nextTurn,
  addLog,
} = battleSlice.actions;

export default battleSlice.reducer;
