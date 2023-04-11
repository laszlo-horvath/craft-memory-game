import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface CounterState {
  value: number;
  best: number;
  audioEnabled: boolean;
}

const initialState: CounterState = {
  value: 0,
  best: 0,
  audioEnabled: true,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    checkBestScore: (state, action: PayloadAction<number>) => {
      if (state.best === 0 || state.best > action.payload) {
        state.best = action.payload;
      }
    },
    toggleAudio: (state) => {
      state.audioEnabled = !state.audioEnabled;
    },
  },
});

export const { increment, decrement, reset, checkBestScore, toggleAudio } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

export const selectBest = (state: RootState) => state.counter.best;

export const selectAudio = (state: RootState) => state.counter.audioEnabled;

export default counterSlice.reducer;
