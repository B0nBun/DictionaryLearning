import { useContext, useEffect } from "react"
import { GameMode, GameState, gameStateContext, GameStatus } from "../../../Providers/GameState"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { filterOutEmptyWords, last, shuffle } from "../../../utils"
import { motion, AnimatePresence, Variants } from 'framer-motion'

const animationProps = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    },
}

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
            <AnimatePresence exitBeforeEnter={true}>
            <motion.button {...animationProps} key={`word-${last(gameState.playingWords)!.word}`} className="guess-block" onClick={e => setGameState({...gameState, status : GameStatus.Definition})}>
                {last(gameState.playingWords)!.word}
            </motion.button>
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence exitBeforeEnter={true}>
        <motion.div {...animationProps} key={`word-${last(gameState.playingWords)!.word}`} className="answer-block">
            <span className="guess-result">
            {last(gameState.playingWords)!.word}
            </span>
            <div className="answers">
                <button className="btn correct" onClick={handleAnswer}>Correct</button>
                <button className="btn incorrect" onClick={handleAnswer}>Incorrect</button>
            </div>
        </motion.div>
        </AnimatePresence>
    )
}

const getDefinitionJSX = (gameState : GameState, setGameState : (gameState : GameState) => void) => {    
    const handleAnswer = (correct : boolean) => () => {
        setGameState({
            ...gameState,
            playingWords: [...gameState.playingWords.slice(0, -1)],
            status: GameStatus.Word,
            score: {
                correct: gameState.score.correct + (correct ? 1 : 0),
                total: gameState.score.total + 1
            }
        })
    }
    
    if (gameState.gameMode === GameMode.DefByWord) {
        return (
            <AnimatePresence exitBeforeEnter={true}>
            <motion.div {...animationProps} key={`def-${last(gameState.playingWords)!.definition}`} className="answer-block">
                <span className="guess-result">
                {last(gameState.playingWords)!.definition}
                </span>
                <div className="answers">
                    <button className="btn correct" onClick={handleAnswer(true)}>Correct</button>
                    <button className="btn incorrect" onClick={handleAnswer(false)}>Incorrect</button>
                </div>
            </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence exitBeforeEnter={true}>
        <motion.button {...animationProps} key={`def-${last(gameState.playingWords)!.definition}`} className="guess-block" onClick={e => setGameState({...gameState, status : GameStatus.Word})}>
            {last(gameState.playingWords)!.definition}
        </motion.button>
        </AnimatePresence>
    )
}

export default function PlayingBody() {
    const [gameState, setGameState] = useContext(gameStateContext)
    const [wordsState, setWordsState] = useContext(wordStorageContext)
    
    useEffect(() => {
        filterOutEmptyWords(wordsState, setWordsState)
        handleRestart()
    // eslint-disable-next-line
    }, [])
    
    const handleRestart = () => {
        setGameState({
            ...gameState,
            status : gameState.gameMode === GameMode.DefByWord ? GameStatus.Word : GameStatus.Definition,
            playingWords: shuffle([...wordsState.words.filter(word => word.included)]),
            score: {
                total: 0,
                correct: 0,
            }
        })
    }

    const handleModeSwitch = () => {
        setGameState({
            ...gameState,
            gameMode: gameState.gameMode === GameMode.DefByWord ? GameMode.WordByDef : GameMode.DefByWord,
            status: gameState.gameMode === GameMode.DefByWord ? GameStatus.Definition : GameStatus.Word,
            playingWords: shuffle([...wordsState.words.filter(word => word.included)])
        })
    }
    
    const pageVariants : Variants = {
        initial: {
            x: '-100%',
            opacity: 0,
        },
        appear: {
            x: '0%',
            opacity: 1,
        },
        exit: {
            x: '-100%',
            opacity: 0,
        }
    }
    
    return (
        <motion.div
            className="play-body"
            variants={pageVariants}
            initial="initial"
            animate="appear"
            exit="exit"
            transition={{ease: 'easeInOut'}}
        >
            <span className="score">{gameState.score.correct} / {gameState.score.total}</span>
            <AnimatePresence exitBeforeEnter={true}>
            {
                gameState.status === GameStatus.NotPlaying ?
                    <motion.span {...animationProps} key="restart-warn" className="warning">Restart to begin!</motion.span> :
                gameState.playingWords.length === 0 ?
                    <motion.span {...animationProps} key="no-words-warn" className="warning">No words left!</motion.span> :
                gameState.status === GameStatus.Word ?
                    getWordJSX(gameState, setGameState) :
                gameState.status === GameStatus.Definition ?
                    getDefinitionJSX(gameState, setGameState) :
                <motion.span {...animationProps} key="cant-display-warn">Can't display game in status ${gameState.status}</motion.span>
            }
            </AnimatePresence>
            <div className="restart-mode-container">
                <button className="mode-switch btn" onClick={handleModeSwitch}>Current Mode: {gameState.gameMode}</button>
                <button className="restart btn" onClick={handleRestart}>Restart</button>
            </div>
        </motion.div>
    )
}