import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { Player } from 'types/enums';

// data stored for each player
export type PlayerInfo = {
  steps: number; // pair tries in one game, checking 2 cards means 1 step
  best: number; // lowest number of steps to win the game (in 1 player game)
  score: number; // number of times pair found (in 2 player game)
};

type PlayerDictonary = {
  [key in Player]?: PlayerInfo
};

export interface CounterState {
  players: PlayerDictonary;
  audioEnabled: boolean;
  activePlayer: Player;
}

const initialState: CounterState = {
  players: {},
  audioEnabled: true,
  activePlayer: Player.Player1,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players[action.payload] = {
        steps: 0,
        best: 0,
        score: 0,
      };
    },
    makeStep: (state, action: PayloadAction<Player>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      (state.players[action.payload] as PlayerInfo).steps += 1;
    },
    reset: (state, action: PayloadAction<Player>) => {
      if (state.players[action.payload]) {
        (state.players[action.payload] as PlayerInfo).steps = 0;
        (state.players[action.payload] as PlayerInfo).score = 0;
      }
    },
    addScore: (state, action: PayloadAction<Player>) => {
      (state.players[action.payload] as PlayerInfo).score += 1;
    },
    checkBestScore: (state, action: PayloadAction<{ player: Player, highScore: number }>) => {
      const { player, highScore } = action.payload;
      const playerInfo = state.players[player] as PlayerInfo;
      if (playerInfo.best === 0 || playerInfo.best > highScore) {
        playerInfo.best = highScore;
      }
    },
    toggleAudio: (state) => {
      state.audioEnabled = !state.audioEnabled;
    },
    toggleActivePlayer: (state) => {
      if (Object.keys(state.players).length > 1) {
        state.activePlayer = state.activePlayer === Player.Player1 ? Player.Player2 : Player.Player1;
      } else {
        state.activePlayer = Player.Player1;
      }
    },
  },
});

export const { addPlayer, makeStep, reset, addScore, checkBestScore, toggleAudio, toggleActivePlayer } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayersScore = (state: RootState) => ([state.counter.players.player1?.score, state.counter.players.player2?.score]);

export const selectPlayersBestScore = (state: RootState) => ([ state.counter.players.player1?.best, state.counter.players.player2?.best ]);

export const selectPlayerSteps = (state: RootState) => ([ state.counter.players.player1?.steps, state.counter.players.player2?.steps ]);

export const selectAudio = (state: RootState) => state.counter.audioEnabled;

export const selectPlayerCount = (state: RootState) => Object.keys(state.counter.players).length;

export const selectActivePlayer = (state: RootState) => state.counter.activePlayer;

export default counterSlice.reducer;
