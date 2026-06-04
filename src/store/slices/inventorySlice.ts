import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentInstance } from '@/types/game';

interface InventoryState {
  items: EquipmentInstance[];
  maxSlots: number;
}

const initialState: InventoryState = {
  items: [],
  maxSlots: 20,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<EquipmentInstance>) => {
      if (state.items.length < state.maxSlots) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    equipItem: (state, action: PayloadAction<{ itemId: string; targetId: string }>) => {
      const item = state.items.find((i) => i.id === action.payload.itemId);
      if (item) {
        item.equippedTo = action.payload.targetId;
      }
    },
    unequipItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.equippedTo = null;
      }
    },
    upgradeItem: (state, action: PayloadAction<{ itemId: string; newLevel: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.itemId);
      if (item) {
        item.level = action.payload.newLevel;
        item.quality = Math.min(100, item.quality + 10);
      }
    },
    expandInventory: (state, action: PayloadAction<number>) => {
      state.maxSlots += action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  equipItem,
  unequipItem,
  upgradeItem,
  expandInventory,
} = inventorySlice.actions;

export default inventorySlice.reducer;
