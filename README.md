# Pawsome Pairs &#128062;

I've built a simple web application using React, Typescript and Redux that is a classic matching memory game using pictures of dogs.

The game has the following features:
- Supports 1 or 2 players
- In singleplayer mode, the game counts how many times the players uncovered 2 cards (trying to find 2 matches) and tracks his best (lowest) attempt
- In 2-player mode, the game counts how many times each player found a pair
- In 2-player mode, the players play in a hot-seat game, meaning they can uncover cards until they find matches, once no match, its the other players turn
- In 2-player mode the UI colors are changing according to the current player who turn is actual
- Supports sound effects
- Ability to disable/enable sounds effects
- Fully responsive UI supporting smaller screen sizes as well as mobile devices
- Cross-browser compatible (tested in Chrome, Firefox, Safari)

### Tech Stack & Libs

To build this application, I bootstrapped the project with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template. I picked this template because everything is already configured to my needs so I was able to focus on the actual implementation instead of spending time on configuring the tooling setup.

I used Tailwind CSS to build the UI elements because of its ease of use, easy extendability and fast development process.

For state management I've decided to use Redux with the help of Redux Toolkit as it's one of the most powerful state management library and it was a perfect match for this application.

I used Jest testing framework to write basic unit and component tests.

For deployming the game I've picked [Vercel](https://vercel.com/) because it's really easy to deploy your code from a Github repository.

## Commands

- `npm start`: Runs the app in the development mode at [http://localhost:3000](http://localhost:3000).
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Deployment URL

[https://craft-memory-game-khaki.vercel.app](https://craft-memory-game-khaki.vercel.app/)

## Credits

API used for images: [https://dog.ceo](https://dog.ceo/)

Laszlo Horvath © 2023 - [https://lhorvath.com](https://lhorvath.com/)

