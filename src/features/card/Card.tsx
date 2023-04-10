import cx from "classnames";
import useSound from 'use-sound';
import type { ICard } from "./../../../types";

interface CardProps {
  card: ICard;
  onClick: (index: ICard) => void;
  isDisabled: boolean;
}

const Card = ({ card, onClick, isDisabled }: CardProps) => {
  const [playCardFlipSound] = useSound('/sounds/card-flip.ogg');

  const onCardClick = () => {
    if (!card.isFlipped && !isDisabled) {
      onClick(card);
      playCardFlipSound();
    }
  };

  return (
    <div
      className={cx("relative preserve-3d w-full h-full rounded-md shadow-md cursor-pointer perspective duration-1000", {
        "my-rotate-y-180": card.isFlipped === true,
        "!-rotate-45  blur-xl opacity-0 pointer-events-none outline-none select-none": card.isInactive === true,
      })}
      onClick={() => onCardClick()}
      >
      <div className="absolute backface-hidden w-full h-full rounded-md bg-white opacity-100">
        {/* TODO remove once ready */}
        {/* <span className="text-xs relative bg-white z-50 p-1 text-blue-900">{card.url.substring(card.url.length - 10, card.url.length)}</span> */}

        <div className="absolute z-10 top-0 left-0 right-0 bottom-0 rounded-md pattern-zigzag pattern-bg-white pattern-craft-blue pattern-opacity-30 pattern-size-6" />
      </div>
      <div className="absolute my-rotate-y-180 backface-hidden w-full h-full rounded-md overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${card.url})` }}
          />
      </div>
    </div>
  );
};

export default Card;
