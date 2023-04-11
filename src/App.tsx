import { Header } from 'components/header/Header';
import { CardsContainer } from 'components/card/CardsContainer';

import './App.css';

const GameBackground = () =>
  <div className="pointer-events-none fixed top-0 left-0 right-0 bottom-0 pattern-dots pattern-purple-500 pattern-bg-white pattern-size-6 pattern-opacity-5" />

function App() {
  return (
    <div className="App h-screen">
      <GameBackground />

      <Header />

      <CardsContainer />
    </div>
  );
}

export default App;
