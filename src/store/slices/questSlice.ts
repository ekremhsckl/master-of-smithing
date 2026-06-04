import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quest } from '@/types/game';

interface QuestState {
  quests: Quest[];
  currentQuestId: string | null;
  completedQuestIds: string[];
}

const initialState: QuestState = {
  quests: [],
  currentQuestId: null,
  completedQuestIds: [],
};

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    addQuest: (state, action: PayloadAction<Quest>) => {
      state.quests.push(action.payload);
    },
    startQuest: (state, action: PayloadAction<string>) => {
      state.currentQuestId = action.payload;
    },
    updateQuestProgress: (
      state,
      action: PayloadAction<{ questId: string; taskId: string; progress: number }>
    ) => {
      const quest = state.quests.find((q) => q.id === action.payload.questId);
      if (quest) {
        const task = quest.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.currentCount = Math.min(task.targetCount, action.payload.progress);
        }
      }
    },
    completeQuest: (state, action: PayloadAction<string>) => {
      const quest = state.quests.find((q) => q.id === action.payload);
      if (quest) {
        quest.isCompleted = true;
        state.completedQuestIds.push(action.payload);
        if (state.currentQuestId === action.payload) {
          state.currentQuestId = null;
        }
      }
    },
  },
});

export const { addQuest, startQuest, updateQuestProgress, completeQuest } =
  questSlice.actions;

export default questSlice.reducer;
