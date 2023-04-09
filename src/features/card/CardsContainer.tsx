import { useEffect, useState } from "react";
import Card from "./Card";
import { fetcher, shuffle } from "../../lib/utils";
import { ICard } from "../../../types";

import { useAppDispatch } from '../../app/hooks';
import { increment } from './../counter/counterSlice';

// TODO make this dynamic based on difficulty
const CARD_COUNT = 24;

const API_URL = `https://dog.ceo/api/breeds/image/random/${CARD_COUNT / 2}`

export const CardsContainer = () => {
  const dispatch = useAppDispatch();
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState<ICard[]>([]);
  const [matches, setMatches] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  console.log('--- matches:', matches);

  // console.log('--- - cards:', cards);
  const [openCards, setOpenCards] = useState<ICard[]>([]);
  console.log('--- - openCards:', openCards);

  useEffect(() => {
    const fetchImages = async () => {
      const { message } = await fetcher(API_URL);

      const cards = message.map((url: any, index: number): ICard => {
        return {
          index,
          url,
          isFlipped: false,
          isInactive: false,
        }
      });

      const cardsCopy = [...cards].map(x => ({ ...x, index: cards.length + x.index }));
      const shuffledCards = shuffle(cards.concat(cardsCopy))
      setCards(shuffledCards);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (openCards.length === 2) {
      timeout = setTimeout(checkCards, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkProgress();
  }, [matches]);

  const checkProgress = () => {
    const noMoreCards = cards.length === CARD_COUNT && cards.every(c => c.isInactive === true);
    if (Object.keys(matches).length === CARD_COUNT / 2 || noMoreCards) {
      alert('--- YOU WIN!');
    }
  };

  const checkCards = () => {
    const [firstCard, secondCard] = openCards;
    console.log('--- secondCard:', secondCard);
    console.log('--- firstCard:', firstCard);
    const isMatch = firstCard.url === secondCard.url;
    console.log('--- isMatch:', isMatch);

    if (isMatch) {
      firstCard.isInactive = true;
      secondCard.isInactive = true;

      setMatches((prev) => ({ ...prev, [firstCard.url]: true }));
    } else {
      firstCard.isFlipped = false;
      secondCard.isFlipped = false;
    }

    setIsDisabled(false);
    setOpenCards([]);
  };

  const onCardClick = (card: ICard) => {
    card.isFlipped = true;

    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, card]);
      // setMoves((moves) => moves + 1);
      dispatch(increment());
      setIsDisabled(true);
    } else {
      // clearTimeout(timeout.current);
      setOpenCards([card]);
    }
  };

  return (
    <>
      <div className="w-3/4 h-full mx-auto flex items-center">
        <div className="w-full h-3/4 mx-auto flex items-center justify-center">
          <div className="w-full h-full grid grid-rows-4 grid-cols-6 gap-6">
            {cards.map((card, index) => (
              <Card key={index} onClick={onCardClick} card={card} isDisabled={isDisabled} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};