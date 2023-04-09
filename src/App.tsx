// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

import { CardsContainer } from './features/card/CardsContainer';

import './App.css';
import { Header } from './features/header/Header';

function App() {
  return (
    <div className="App h-screen">
      {/* <div className="pointer-events-none fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" /> */}

      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Counter /> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
      {/* </header> */}

      <Header />

      <CardsContainer />
    </div>
  );
}

export default App;
