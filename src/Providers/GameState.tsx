import React, { useState } from 'react'
import type { Word } from '../interfaces'

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
    gameMode : GameMode,
    score: {
        correct: number,
        total: number
    }
}

export const gameStateContext :  React.Context<[GameState, (gameState : GameState) => void]> 
    = React.createContext([
        {
            playingWords : ([] as Word[]),
            status : (GameStatus.NotPlaying as GameStatus),
            gameMode : (GameMode.DefByWord as GameMode),
            score: {
                correct: 0,
                total: 0,
            }
        },
        gameState => {}
    ])

interface Props {
    state : GameState,
    children : JSX.Element | JSX.Element[]
}

export default function GameStateProvider({state, children} : Props) {
    const [gameState, setGameState] : [GameState, React.Dispatch<React.SetStateAction<GameState>>]
        = useState(state)

    return <gameStateContext.Provider value={[gameState, setGameState]}>{children}</gameStateContext.Provider>
}