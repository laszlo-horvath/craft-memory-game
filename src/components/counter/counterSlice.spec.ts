import counterReducer, {
  CounterState,
  increment,
  decrement,
  reset,
} from 'components/counter/counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    best: 5,
  };
  // it('should handle initial state', () => {
  //   expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
  //     value: 0,
  //     best: 0,
  //   });
  // });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  // it('should reset state back to initial', () => {
  //   const actual = counterReducer(initialState, reset());
  //   expect(actual.value).toEqual(0);
  // });
});
