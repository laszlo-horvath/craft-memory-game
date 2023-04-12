import counterReducer, {
  CounterState,
  makeStep,
  reset,
  toggleAudio,
  checkBestScore,
  PlayerInfo,
  addPlayer,
  addScore,
  toggleActivePlayer,
} from 'redux/counterSlice';
import { Player } from 'types/enums';

const resetInitialState = (): CounterState => ({
  players: {
    [Player.Player1]: {
      steps: 3,
      best: 5,
      score: 0,
    },
    [Player.Player2]: {
      steps: 5,
      best: 10,
      score: 3,
    },
  },
  audioEnabled: true,
  activePlayer: Player.Player1,
});

describe('counter reducer', () => {
  let initialState: CounterState;

  beforeEach(() => {
    initialState = resetInitialState();
  });

  it('should handle initial state', () => {
    const initialState = counterReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual({
      players: {},
      audioEnabled: true,
      activePlayer: 'player1'
    });
  });

  it('should handle addPlayer', () => {
    let state = counterReducer(undefined, addPlayer(Player.Player1));
    expect(state.players[Player.Player1]).toEqual({
      steps: 0,
      best: 0,
      score: 0,
    });

    state = counterReducer(state, addPlayer(Player.Player2));
    expect(state.players[Player.Player2]).toEqual({
      steps: 0,
      best: 0,
      score: 0,
    });
  });

  it('should handle makeStep', () => {
    let state = counterReducer(initialState, makeStep(Player.Player1));
    expect((state.players[Player.Player1] as PlayerInfo).steps).toEqual(4);

    state = counterReducer(state, makeStep(Player.Player1));
    expect((state.players[Player.Player1] as PlayerInfo).steps).toEqual(5);

    state = counterReducer(state, makeStep(Player.Player2));
    expect((state.players[Player.Player2] as PlayerInfo).steps).toEqual(6);
  });

  it('should reset steps and score back to initial', () => {
    let state = counterReducer(initialState, reset(Player.Player1));
    expect((state.players[Player.Player1] as PlayerInfo)).toEqual({
      steps: 0,
      best: 5,
      score: 0,
    });

    state = counterReducer(state, reset(Player.Player2));
    expect((state.players[Player.Player2] as PlayerInfo)).toEqual({
      steps: 0,
      best: 10,
      score: 0,
    });
  });

  it('should handle addScore', () => {
    let state = counterReducer(initialState, addScore(Player.Player1));
    expect((state.players[Player.Player1] as PlayerInfo).score).toEqual(1);

    state = counterReducer(state, addScore(Player.Player1));
    expect((state.players[Player.Player1] as PlayerInfo).score).toEqual(2);

    state = counterReducer(state, addScore(Player.Player2));
    expect((state.players[Player.Player2] as PlayerInfo).score).toEqual(4);

    state = counterReducer(state, addScore(Player.Player2));
    expect((state.players[Player.Player2] as PlayerInfo).score).toEqual(5);
  });

  it('should toggle audio', () => {
    let state = counterReducer(initialState, toggleAudio());
    expect(state.audioEnabled).toEqual(false);

    state = counterReducer(state, toggleAudio());
    expect(state.audioEnabled).toEqual(true);
  });

  it('should update best score', () => {
    let state = counterReducer(initialState, checkBestScore({ player: Player.Player1, highScore: 5 }));
    expect((state.players[Player.Player1] as PlayerInfo).best).toEqual(5);

    state = counterReducer(state, checkBestScore({ player: Player.Player1, highScore: 2 }));
    expect((state.players[Player.Player1] as PlayerInfo).best).toEqual(2);
  });

  it('should toggle active player', () => {
    const initialState = counterReducer(undefined, { type: 'unknown' });

    // default
    expect(initialState.activePlayer).toEqual(Player.Player1);

    // in single player mode this should not change
    let state = counterReducer(initialState, addPlayer(Player.Player1));
    state = counterReducer(state, toggleActivePlayer());
    expect(state.activePlayer).toEqual(Player.Player1);

    // in multiplayer mode it should toggle

    state = counterReducer(state, addPlayer(Player.Player2));
    expect(initialState.activePlayer).toEqual(Player.Player1);

    state = counterReducer(state, toggleActivePlayer());
    expect(state.activePlayer).toEqual(Player.Player2);
  });
});