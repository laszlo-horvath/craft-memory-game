import { useEffect, useState } from "react";
import useSound from 'use-sound';
import Card from "components/card/Card";
import type { ICard } from "types";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addScore, checkBestScore, makeStep, reset, selectActivePlayer, selectAudio, selectPlayerSteps, selectPlayersScore, toggleActivePlayer } from "redux/counterSlice";
import { YouWinModal } from "components/modal/YouWinModal";
import { CARD_COUNT } from "config";
import { getShuffledCardsWithNewImages } from "lib/api";
import { Player } from "types/enums";

export const CardsContainer = () => {
  // redux store
  const dispatch = useAppDispatch();
  const [ player1, player2 ] = useAppSelector(selectPlayersScore);
  const [ player1Steps, player2Steps ] = useAppSelector(selectPlayerSteps);
  const activePlayer = useAppSelector(selectActivePlayer);

  // local states
  const [cards, setCards] = useState<ICard[]>([]);
  const [matches, setMatches] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [openCards, setOpenCards] = useState<ICard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAudioEnabled = useAppSelector(selectAudio);
  const [playDogBarkSound] = useSound(['/sounds/dog-bark-1.ogg', '/sounds/dog-bark-1.m4a']);

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
      dispatch(checkBestScore({ player: activePlayer, highScore: activePlayer === "player1" ? (player1Steps as number) : (player2Steps as number) }));

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
      firstCard.isInactive = true;
      secondCard.isInactive = true;

      isAudioEnabled && playDogBarkSound();
      setMatches((prev) => ({ ...prev, [firstCard.url]: true }));
      dispatch(addScore(activePlayer));
    } else {
      firstCard.isFlipped = false;
      secondCard.isFlipped = false;

      dispatch(toggleActivePlayer());
    }

    setIsDisabled(false);
    setOpenCards([]);
  };

  const onCardClick = (card: ICard) => {
    card.isFlipped = true;

    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, card]);
      dispatch(makeStep(activePlayer));
      setIsDisabled(true);
    } else {
      setOpenCards([card]);
    }
  };

  const restartGame = () => {
    newGame();
    dispatch(reset(Player.Player1));
    dispatch(reset(Player.Player2));
    dispatch(toggleActivePlayer());
    setOpenCards([]);
    setMatches({});

    // wait until cards animate in
    setTimeout(() => closeModal(), 500);
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
                activePlayer={activePlayer}
              />
            ))}
          </div>
        </div>
      </div>

      <YouWinModal isModalOpen={isModalOpen} onCtaClick={restartGame} />
    </>
  );
};
