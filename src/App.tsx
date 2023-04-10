// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

import { CardsContainer } from './features/card/CardsContainer';

import './App.css';
import { Header } from './features/header/Header';

function App() {
  return (
    <div className="App h-screen">
      <div className=" pointer-events-none fixed top-0 left-0 right-0 bottom-0 pattern-dots pattern-purple-500 pattern-bg-white pattern-size-6 pattern-opacity-5"></div>

      <Header />

      <CardsContainer />
    </div>
  );
}

export default App;
