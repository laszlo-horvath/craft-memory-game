import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addPlayer, selectActivePlayer, toggleActivePlayer } from 'redux/counterSlice';
import cx from 'classnames';

import { Header } from 'components/header/Header';
import { CardsContainer } from 'components/card/CardsContainer';
import { PlayersCountPickerModal } from 'components/modal/PlayersCountPickerModal';

import { Player } from 'types/enums';

import './App.css';

const GameBackground = () => {
  const activePlayer = useAppSelector(selectActivePlayer);

  return (
    <div className={cx("pointer-events-none fixed top-0 left-0 right-0 bottom-0 pattern-dots pattern-bg-white pattern-size-6 pattern-opacity-5", {
      "pattern-craft-blue": activePlayer === Player.Player1,
      "pattern-craft-purple": activePlayer === Player.Player2,
    })} />
  );
}

function App() {
  const [playersCount, setPlayersCount] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (playersCount) {
      onPlayersCountSelect(playersCount);
    }
  }, [playersCount]);

  const onPlayersCountSelect = (playersCount: number) => {
    dispatch(addPlayer(Player.Player1));
    dispatch(toggleActivePlayer());

    if (playersCount === 2) {
      dispatch(addPlayer(Player.Player2));
    }

    setIsModalOpen(false);
  };

  return (
    <div className="App h-screen">
      <GameBackground />

      {playersCount &&<Header />}

      {playersCount && <CardsContainer />}

      <PlayersCountPickerModal isModalOpen={isModalOpen} onCtaClick={setPlayersCount} />
    </div>
  );
}

export default App;
