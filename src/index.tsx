import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
 import './reset.css';
import './utils.css';
import App from './Components/App/App';
import GameStateProvider, { GameStatus } from './Providers/GameState'
import reportWebVitals from './reportWebVitals';
import WordStorageProvider from './Providers/WordStorage';
import PageProvider from './Providers/PageProvider';
import { getGameMode } from './utils';

// TODO: Implment some animations with framer-motion
// TODO: PWA
ReactDOM.render(
  <React.StrictMode>
  <GameStateProvider state={{
    playingWords : [],
    status : GameStatus.NotPlaying,
    gameMode: getGameMode(),
    score : {
      correct: 0,
      total: 0
    }
  }}>
  <WordStorageProvider>
  <PageProvider>
    <App />
  </PageProvider>
  </WordStorageProvider>
  </GameStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
