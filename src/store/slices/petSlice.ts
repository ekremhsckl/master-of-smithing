import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from '@/types/game';

interface PetState {
  pets: Pet[];
  activeTeam: string[];
}

const initialState: PetState = {
  pets: [],
  activeTeam: [],
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
    },
    removePet: (state, action: PayloadAction<string>) => {
      state.pets = state.pets.filter((p) => p.id !== action.payload);
      state.activeTeam = state.activeTeam.filter((id) => id !== action.payload);
    },
    upgradePet: (state, action: PayloadAction<{ petId: string; experience: number }>) => {
      const pet = state.pets.find((p) => p.id === action.payload.petId);
      if (pet) {
        pet.experience += action.payload.experience;
        const expPerLevel = 500;
        while (pet.experience >= expPerLevel) {
          pet.level += 1;
          pet.experience -= expPerLevel;
          pet.hp = pet.maxHp;
          pet.attack = Math.floor(pet.attack * 1.1);
          pet.defense = Math.floor(pet.defense * 1.05);
        }
      }
    },
    addToTeam: (state, action: PayloadAction<string>) => {
      if (state.activeTeam.length < 3 && !state.activeTeam.includes(action.payload)) {
        state.activeTeam.push(action.payload);
      }
    },
    removeFromTeam: (state, action: PayloadAction<string>) => {
      state.activeTeam = state.activeTeam.filter((id) => id !== action.payload);
    },
    healPet: (state, action: PayloadAction<{ petId: string; amount: number }>) => {
      const pet = state.pets.find((p) => p.id === action.payload.petId);
      if (pet) {
        pet.hp = Math.min(pet.maxHp, pet.hp + action.payload.amount);
      }
    },
  },
});

export const {
  addPet,
  removePet,
  upgradePet,
  addToTeam,
  removeFromTeam,
  healPet,
} = petSlice.actions;

export default petSlice.reducer;
