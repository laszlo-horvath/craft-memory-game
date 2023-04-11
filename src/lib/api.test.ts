import { getShuffledCardsWithNewImages } from './api';

const mockApiResult = { message: [
  { url: 'url-1' },
  { url: 'url-2' },
  { url: 'url-3' },
]};

jest.mock("./utils", () => ({
  fetcher: jest.fn(() => new Promise((resolve) => resolve(mockApiResult))),
  shuffle: jest.fn(x => x),
}));

jest.mock("config", () => ({
  API_URL: "my-api-url",
}));

describe('API', () => {
  describe('getShuffledCardsWithNewImages', () => {
    it('should return an array with double the size of the API result', async () => {
      const cards = await getShuffledCardsWithNewImages();
      expect(cards).toHaveLength(mockApiResult.message.length * 2);
    });

    it('should return an array of card objects', async () => {
      const cards = await getShuffledCardsWithNewImages();

      const sampleCard = cards[0];
      expect(sampleCard).toHaveProperty('index');
      expect(sampleCard).toHaveProperty('url');
      expect(sampleCard).toHaveProperty('isFlipped');
      expect(sampleCard).toHaveProperty('isInactive');
    });
  });
});
