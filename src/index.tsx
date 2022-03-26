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
import NotificationProvider from './Providers/NotificationProvider';

// TODO: Ability to add at least one image to definition
// TODO: Need notification about removal of a word (meybe a button to undo)
//       Otherwise accidental deletion is frustrating, since you can't tell which word you removed
// TODO: Replace css with emotion.js (at least for the most part)
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
  <NotificationProvider>
    <App />
  </NotificationProvider>
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
