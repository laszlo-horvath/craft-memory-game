import counterReducer, {
  CounterState,
  increment,
  decrement,
  reset,
  toggleAudio,
  checkBestScore,
} from 'redux/counterSlice';

const resetInitialState = (): CounterState => ({
  value: 3,
  best: 5,
  audioEnabled: true,
});

describe('counter reducer', () => {
  let initialState: CounterState;

  beforeEach(() => {
    initialState = resetInitialState();
  });

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      best: 0,
      audioEnabled: true,
    });
  });

  it('should handle increment', () => {
    const state = counterReducer(initialState, increment());
    expect(state.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const state = counterReducer(initialState, decrement());
    expect(state.value).toEqual(2);
  });

  it('should reset state back to initial', () => {
    const state = counterReducer(initialState, reset());
    expect(state.value).toEqual(0);
  });

  it('should toggle audio', () => {
    let state = counterReducer(initialState, toggleAudio());
    expect(state.audioEnabled).toEqual(false);

    state = counterReducer(state, toggleAudio());
    expect(state.audioEnabled).toEqual(true);
  });

  it('should update best score', () => {
    let state = counterReducer(initialState, increment());
    expect(state.value).toEqual(4);
    expect(state.best).toEqual(5);

    state = counterReducer(state, checkBestScore(2));
    expect(state.best).toEqual(2);
  });
});
