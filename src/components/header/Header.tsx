import cx from "classnames";
import { useAppSelector } from "redux/hooks";
import { selectBest, selectCount } from "components/counter/counterSlice";

export const Header = () => {
  const moves = useAppSelector(selectCount);
  const best = useAppSelector(selectBest);

  const poorPerformanceIndicator = () => best > 0 && moves > best * 1.5 && <span className="pl-1">😢</span>;

  return (
    <header className="z-[5] fixed top-0 left-0 right-0 h-10 shadow-lg flex items-center bg-gradient-to-r from-craft-blue to-pink-600 via-craft-purple animate-gradient-x">
      <div className="w-full px-6 lg:w-3/4 lg:px-0 mx-auto flex items-center justify-between text-white font-bold">
        <div className="flex items-center gap-x-0.5">
          <img src="/paw.svg" alt="Paw" className="w-6 h-6 inline-block text-white" />
          Pawsome Pairs
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm">
            <span className="hidden md:inline">Current </span>
            Score: <span className={cx({
              "text-green-400": best === 0 || moves <= best,
              "text-red-400": best > 0 && moves > best,
            })}>{moves}</span>{poorPerformanceIndicator()}
          </p>
          {best > 0 && <p className="text-sm">
            Best: <span>{best}</span>
          </p>}
        </div>
      </div>
    </header>
  );
};