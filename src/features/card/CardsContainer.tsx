import { useEffect, useState } from "react";
import useSound from 'use-sound';
import Card from "./Card";
import { fetcher, shuffle } from "../../lib/utils";
import { ICard } from "../../../types";
// import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkBestScore, increment, reset, selectCount } from "./../counter/counterSlice";
import { Modal } from "../modal/Modal";

// TODO make this dynamic based on difficulty
const CARD_COUNT = 24;

const API_URL = `https://dog.ceo/api/breeds/image/random/${CARD_COUNT / 2}`;

const getShuffledCardsWithNewImages = async () => {
  const { message } = await fetcher(API_URL);

  const cards = message.map((url: any, index: number): ICard => {
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

export const CardsContainer = () => {
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState<ICard[]>([]);
  const [matches, setMatches] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [openCards, setOpenCards] = useState<ICard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moves = useAppSelector(selectCount);

  const [playDogBarkSound] = useSound('/sounds/dog-bark-1.ogg');

  const newGame = async () => {
    const shuffledCards = await getShuffledCardsWithNewImages();
    setCards(shuffledCards);
  };

  useEffect(() => {
    newGame();
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
    if (Object.keys(matches).length === CARD_COUNT / 2) {
      dispatch(checkBestScore(moves));

      // wait the card animation to finish
      setTimeout(() => {
        setIsModalOpen(true);
      }, 750);
    }
  };

  const checkCards = () => {
    const [firstCard, secondCard] = openCards;
    const isMatch = firstCard.url === secondCard.url;

    if (isMatch) {
      // firstCard.isFlipped = false;
      firstCard.isInactive = true;
      // secondCard.isFlipped = false;
      secondCard.isInactive = true;

      playDogBarkSound();
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
      dispatch(increment());
      setIsDisabled(true);
    } else {
      // clearTimeout(timeout.current);
      setOpenCards([card]);
    }
  };

  const restartGame = () => {
    setOpenCards([]);
    dispatch(reset()); //TODO rename reset
    setMatches({});
    closeModal();
    newGame();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full px-6 lg:w-3/4 lg:px-0 h-full mx-auto flex items-center pt-4 lg:pt-0">
        <div className="w-full h-5/6 lg:h-3/4 mx-auto flex items-center justify-center">
          <div className="w-full h-full grid grid-rows-6 grid-cols-4 lg:grid-rows-4 lg:grid-cols-6 gap-4 lg:gap-6">
            {cards.map((card, index) => (
              <Card
                key={index}
                onClick={onCardClick}
                card={card}
                isDisabled={isDisabled}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal isModalOpen={isModalOpen} onCtaClick={restartGame} />
    </>
  );
};
