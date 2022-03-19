import { useContext } from "react"
import { GameMode, GameState, gameStateContext, GameStatus } from "../../../Providers/GameState"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { last, shuffle } from "../../../utils"

const getWordJSX = (gameState : GameState, setGameState : (gameState : GameState) => void) => {
    const handleAnswer = () => {
        setGameState({
            ...gameState,
            playingWords: [...gameState.playingWords.slice(0, -1)],
            status: GameStatus.Definition,
        })
    }
    
    if (gameState.gameMode === GameMode.DefByWord) {
        return (
            <button onClick={e => setGameState({...gameState, status : GameStatus.Definition})}>
                {last(gameState.playingWords)!.word}
            </button>
        )
    }

    return (
        <div className="column">
            <span>
            {last(gameState.playingWords)!.word}
            </span>
            <button onClick={handleAnswer}>Correct</button>
            <button onClick={handleAnswer}>Incorrect</button>
        </div>
    )
}

const getDefinitionJSX = (gameState : GameState, setGameState : (gameState : GameState) => void) => {    
    const handleAnswer = () => {
        setGameState({
            ...gameState,
            playingWords: [...gameState.playingWords.slice(0, -1)],
            status: GameStatus.Word,
        })
    }
    
    if (gameState.gameMode === GameMode.DefByWord) {
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

    return (
        <button onClick={e => setGameState({...gameState, status : GameStatus.Word})}>
            {last(gameState.playingWords)!.definition}
        </button>
    )
}

export default function PlayingBody() {
    const [gameState, setGameState] = useContext(gameStateContext)
    const [wordsState] = useContext(wordStorageContext)
    
    const handleRestart = () => {
        setGameState({
            ...gameState,
            status : gameState.gameMode === GameMode.DefByWord ? GameStatus.Word : GameStatus.Definition,
            playingWords: shuffle([...wordsState.words.filter(word => word.included)])
        })
    }

    const handleModeSwitch = () => {
        setGameState({
            gameMode: gameState.gameMode === GameMode.DefByWord ? GameMode.WordByDef : GameMode.DefByWord,
            status: gameState.gameMode === GameMode.DefByWord ? GameStatus.Definition : GameStatus.Word,
            playingWords: shuffle([...wordsState.words.filter(word => word.included)])
        })
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
            <button onClick={handleModeSwitch}>Current Mode: {gameState.gameMode}</button>
        </div>
    )
}