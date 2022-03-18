import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './utils.css';
import App from './Components/App/App';
import GameStateProvider, { GameStatus } from './Providers/GameState'
import reportWebVitals from './reportWebVitals';
import WordStorageProvider from './Providers/WordStorage';
import PageProvider from './Providers/PageProvider';

ReactDOM.render(
  <React.StrictMode>
  <GameStateProvider state={{
    playingWords : [],
    status : GameStatus.NotPlaying
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
