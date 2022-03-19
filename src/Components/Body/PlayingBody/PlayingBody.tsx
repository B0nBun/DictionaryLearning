import { useContext } from "react"
import { SetStateCallback } from "../../../interfaces"
import { GameState, gameStateContext, GameStatus } from "../../../Providers/GameState"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { last, shuffle } from "../../../utils"

const getWordJSX = (gameState : GameState, setGameState : (callback: SetStateCallback<GameState>) => void) => {
    return (
        <button onClick={e => setGameState(state => ({...gameState, status : GameStatus.Definition}))}>
            {last(gameState.playingWords)!.word}
        </button>
    )
}

const getDefinitionJSX = (gameState : GameState, setGameState : (callback : SetStateCallback<GameState>) => void) => {
    const handleAnswer = () => {
        setGameState(state => ({
            playingWords: [...gameState.playingWords.slice(0, -1)],
            status: GameStatus.Word
        }))
    }
    
    return (
        <div className="column">
            <span>
            {last(gameState.playingWords)!.definition}
            </span>
            <button onClick={handleAnswer}>Correct</button>
            <button onClick={handleAnswer}>Incorrect</button>
        </div>
    )
}

// TODO: Guess word by defenition mode
export default function PlayingBody() {
    const [gameState, setGameState] = useContext(gameStateContext)
    const [wordsState] = useContext(wordStorageContext)
    
    const handleRestart = () => {
        setGameState(state => ({
            status : GameStatus.Word,
            playingWords: shuffle([...wordsState.words.filter(word => word.included)])
        }))
    }
    
    return (
        <div className="column">
            <div className="row">
                {
                    gameState.status === GameStatus.NotPlaying ? 'Restart to begin!' :
                    gameState.playingWords.length === 0 ? 'No words left!' :
                    gameState.status === GameStatus.Word ? getWordJSX(gameState, setGameState) :
                    gameState.status === GameStatus.Definition ? getDefinitionJSX(gameState, setGameState) :
                    `Can't display game in status ${gameState.status}`
                }
            </div>
            <button onClick={handleRestart}>Restart</button>
        </div>
    )
}