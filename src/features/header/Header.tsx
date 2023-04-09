import { useAppSelector } from "../../app/hooks";
import { selectCount } from "../counter/counterSlice";

export const Header = () => {
  const moves = useAppSelector(selectCount);

  return (
    <header className="fixed top-0 left-0 right-0 h-10 flex items-center justify-center bg-transparent backdrop-blur-lg shadow-lg">
      <p className="text-sm">
        Moves: <span>{moves}</span>
      </p>
    </header>
  );
};