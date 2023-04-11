import type { ICard } from "types";
import { API_URL } from "config";
import { fetcher, shuffle } from "lib/utils";

export const getShuffledCardsWithNewImages = async () => {
  const { message: imageUrls } = await fetcher(API_URL);

  const cards = imageUrls.map((url: string, index: number): ICard => {
    return {
      index,
      url,
      isFlipped: false,
      isInactive: false,
    };
  });

  const cardsCopy = [...cards].map((x) => ({
    ...x,
    index: cards.length + x.index,
  }));
  const shuffledCards = shuffle(cards.concat(cardsCopy));
  return shuffledCards;
};