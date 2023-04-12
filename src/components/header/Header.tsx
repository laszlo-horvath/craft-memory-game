import cx from "classnames";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  selectActivePlayer,
  selectAudio,
  selectPlayerCount,
  selectPlayerSteps,
  selectPlayersBestScore,
  selectPlayersScore,
  toggleAudio,
} from "redux/counterSlice";
import { Player } from "types/enums";

const poorPerformanceIndicator = (best: number, score: number) =>
  best > 0 && score > best * 1.5 && <span className="pl-1">😢</span>;

export const Header = () => {
  const dispatch = useAppDispatch();
  const [player1Steps] = useAppSelector(selectPlayerSteps);
  const [player1Score, player2Score] = useAppSelector(selectPlayersScore);
  const [player1Best] = useAppSelector(selectPlayersBestScore);
  const activePlayer = useAppSelector(selectActivePlayer);
  const playerCount = useAppSelector(selectPlayerCount);
  const isAudioEnabled = useAppSelector(selectAudio);

  const isSinglePlayer = playerCount === 1;

  const toggleAudioEffects = () => {
    dispatch(toggleAudio());
  };

  return (
    <header
      className={cx(
        "z-[5] fixed top-0 left-0 right-0 h-10 shadow-lg flex items-center transition-colors",
        {
          "bg-craft-blue": activePlayer === Player.Player1,
          "bg-craft-purple": activePlayer === Player.Player2,
        }
      )}
    >
      <div className="w-full px-6 lg:w-3/4 lg:px-0 mx-auto flex items-center justify-between text-white font-bold">
        <div className="flex items-center gap-x-0.5">
          <img
            src="/paw.svg"
            alt="Paw"
            className="w-6 h-6 inline-block text-white"
          />
          Pawsome Pairs
        </div>
        <div className="flex items-center gap-x-0.5 md:gap-x-2">
          {!isSinglePlayer && (
            <p
              className={cx("text-sm px-1.5 py-0.5 transition-colors", {
                "bg-white text-craft-blue rounded-md":
                  activePlayer === Player.Player1,
              })}
            >
              P1<span className="hidden md:inline px-0.5">Score</span>:{" "}
              {player1Score}
            </p>
          )}

          {isSinglePlayer && (
            <p className="text-sm px-1.5 py-0.5">
              P1: <span className={cx({
              "text-green-400": player1Best as number === 0 || (player1Steps as number) <= (player1Best as number),
              "text-red-400": player1Best as number > 0 && (player1Steps as number) > (player1Best as number),
            })}>{player1Steps}</span>{poorPerformanceIndicator(player1Best as number, player1Steps as number)}
            </p>
          )}

          {isSinglePlayer && (player1Best as number) > 0 && (
            <p className="text-sm">
              Best: <span>{player1Best}</span>
            </p>
          )}

          {!isSinglePlayer && (
            <p
              className={cx("text-sm px-1.5 py-0.5 transition-colors", {
                "bg-white text-craft-purple rounded-md":
                  activePlayer === Player.Player2,
              })}
            >
              P2<span className="hidden md:inline px-0.5">Score</span>:{" "}
              {player2Score}
            </p>
          )}

          <div
            onClick={() => toggleAudioEffects()}
            className={cx("cursor-pointer w-4 h-4 bg-cover ml-1", {
              "bg-left": isAudioEnabled,
              "bg-right": !isAudioEnabled,
            })}
            style={{ backgroundImage: "url(/audio-icons.png)" }}
          ></div>
        </div>
      </div>
    </header>
  );
};
