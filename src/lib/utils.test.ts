import { shuffle } from './utils';

describe('Utils', () => {
  describe('shuffle', () => {
    it('should return an array with the same length as input', () => {
      const array = [1, 2, 3, 4, 5];
      const shuffledArray = shuffle(array);
      expect(shuffledArray).toHaveLength(array.length);
    });

    it('should shuffle the input by mutating it', () => {
      const array = [1, 2, 3, 4, 5];
       const result = shuffle(array);
      expect(array).not.toEqual([1, 2, 3, 4, 5]);
      expect(result).toEqual(array);
    });
  });
});

