import React, { useState } from 'react'
import type { SetStateCallback, Word } from '../interfaces'

export enum GameStatus {
    NotPlaying = 'Not Playing',
    Word = 'Word',
    Definition = 'Definition',
}

export enum GameMode {
    DefByWord = 'Definition By Word',
    WordByDef = 'Word By Definition'
}

export interface GameState {
    playingWords : Word[],
    status : GameStatus,
    gameMode : GameMode
}

type SetGameStateCallback = SetStateCallback<GameState>

export const gameStateContext :  React.Context<[GameState, (callback : SetGameStateCallback) => void]> 
    = React.createContext([
        {
            playingWords : ([] as Word[]),
            status : (GameStatus.NotPlaying as GameStatus),
            gameMode : (GameMode.DefByWord as GameMode)
        },
        callback => {}
    ])

interface Props {
    state : GameState,
    children : JSX.Element | JSX.Element[]
}

export default function GameStateProvider({state, children} : Props) {
    const [gameState, setGameState] : [GameState, React.Dispatch<React.SetStateAction<GameState>>]
        = useState(state)

    const setGameStateC = (callback : SetGameStateCallback) => {
        setGameState(callback(state))
    }

    return <gameStateContext.Provider value={[gameState, setGameStateC]}>{children}</gameStateContext.Provider>
}