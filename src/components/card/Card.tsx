import cx from "classnames";
import useSound from 'use-sound';
import type { ICard } from "types";
import { useAppSelector } from "redux/hooks";
import { selectAudio } from "redux/counterSlice";
import { Player } from "types/enums";

interface CardProps {
  card: ICard;
  onClick: (index: ICard) => void;
  isDisabled: boolean;
  activePlayer: Player;
}

const Card = ({ card, onClick, isDisabled, activePlayer }: CardProps) => {
  const isAudioEnabled = useAppSelector(selectAudio);
  const [playCardFlipSound] = useSound(['/sounds/card-flip.ogg', '/sounds/card-flip.m4a']);

  const onCardClick = () => {
    if (!card.isFlipped && !isDisabled) {
      onClick(card);
      isAudioEnabled && playCardFlipSound();
    }
  };

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "404.jpg";
  };

  return (
    <div
      className={cx("relative w-full h-full rounded-md cursor-pointer duration-1000", {
        "!-rotate-45  blur-xl opacity-0 pointer-events-none outline-none select-none": card.isInactive === true,
      })}
      onClick={() => onCardClick()}
      >
      <div className={cx("duration-1000 absolute top-0 left-0 flip-1-start backface-hidden ff-backface-fix safari-backface-fix w-full h-full rounded-md shadow-md overflow-hidden", {
        "flip-1-end": card.isFlipped === true,
      })}>
        {/* uncomment for debugging */}
        {/* <span className="text-xs relative bg-white z-50 p-1 text-blue-900">{card.url.substring(card.url.length - 10, card.url.length)}</span> */}

        <div className={cx("absolute z-10 top-0 left-0 right-0 bottom-0 rounded-md pattern-zigzag pattern-bg-white pattern-opacity-30 pattern-size-6", {
          "pattern-craft-blue": activePlayer === Player.Player1,
          "pattern-craft-purple": activePlayer === Player.Player2,
        })} />
      </div>
      <div className={cx("duration-1000 transition-all absolute top-0 left-0 flip-2-start backface-hidden ff-backface-fix safari-backface-fix w-full h-full rounded-md shadow-md overflow-hidden", {
        "flip-2-end": card.isFlipped === true,
      })}>
          <img
            alt={`Dog #${card.index}`}
            src={card.url}
            className="w-full h-full object-cover"
            onError={(e) => onImageError(e)}
          />
      </div>
    </div>
  );
};

export default Card;
