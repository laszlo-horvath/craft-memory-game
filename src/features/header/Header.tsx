import { useAppSelector } from "../../app/hooks";
import { selectCount } from "../counter/counterSlice";

export const Header = () => {
  const moves = useAppSelector(selectCount);

  return (
    <header className="fixed top-0 left-0 right-0 h-10 shadow-lg flex items-center bg-gradient-to-r from-craft-blue to-pink-600 via-craft-purple animate-gradient-x">
      <div className="w-full px-6 lg:w-3/4 lg:px-0 mx-auto flex items-center justify-between text-white font-bold">
        <div className="flex items-center gap-x-0.5">
          <img src="/paw.svg" alt="Paw" className="w-6 h-6 inline-block text-white" />
          Pawsome Pairs
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm">
            Current Score: <span>{moves}</span>
          </p>
        </div>
      </div>
    </header>
  );
};