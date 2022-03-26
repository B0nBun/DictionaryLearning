import React, { useContext, useEffect, useState } from "react"
import { Page, Word } from "../../../interfaces"
import { pageContext } from "../../../Providers/PageProvider"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { filterBySearch, filterOutEmptyWords, wordCmp } from "../../../utils"
import { motion, Variants } from 'framer-motion' 
import { notificationContext } from "../../../Providers/NotificationProvider"

interface WordProps {
    word : Word,
}

const WordBlock = ({word} : WordProps) : JSX.Element => {
    const [,notify] = useContext(notificationContext)
    const [, setCurrentPage] = useContext(pageContext)
    const [wordsState, setWordsState] = useContext(wordStorageContext)
    
    useEffect(() => {
        filterOutEmptyWords(wordsState, setWordsState)
    // eslint-disable-next-line
    }, [])
    
    const handleWordClick = () => {
        window.history.pushState(Page.WordEdit, document.title, document.location.pathname)
        setCurrentPage(Page.WordEdit)
        setWordsState({
            ...wordsState,
            currentWord : word
        })
    }

    const handleWordRemove = () => {
        setWordsState({
            ...wordsState,
            words: wordsState.words.filter(w => w.word !== word.word)
        })
        notify(`'${word.word}' was removed`)
    }

    const handleWordToggle = () => {
        setWordsState({
            ...wordsState,
            words: wordsState.words.map(w => w.word === word.word ? {
                ...word,
                included: !word.included
            } : w)
        })
    }

    const wordListVariants : Variants = {
        initial: {
            x: '0%',
            opacity: 0
        },
        animate: {
            x: '0%',
            opacity: 1,
        },
    }
    
    return (
        <motion.div
            variants={wordListVariants}
            initial="initial"
            animate="animate"
            className="words-item"
            transition={{ease: 'easeInOut'}}
            layout
        >
            <motion.span tabIndex={0} onClick={handleWordClick} className="word-text" style={{}}>
                {word.word} {word.definition ? '-' : ''} {word.definition}
            </motion.span>
            <motion.button className={`btn ${word.included ? 'active' : ''}`} onClick={handleWordToggle}>{word.included ? `\u2713` : ``}</motion.button>
            <motion.button className="btn" onClick={handleWordRemove}>X</motion.button>
        </motion.div>
    )
}

export default function WordListBody() {
    const [wordsState, setWordsState] = useContext(wordStorageContext)
    
    const [newWord, setNewWord] = useState("")
    const [newDefinition, setNewDefinition] = useState("")
    const [search, setSearch] = useState("")
    
    const [error, setError] = useState("")

    const handleAdd = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (wordsState.words.some(word => word.word.toUpperCase() === newWord.toUpperCase())) {
            setError(`Word '${newWord}' already exists in the dictionary`)
            return
        }
        if (newWord.match(/[<>|]/)) {
            setError("`< > |` symbols are reserved, you can't use them in words")
            return
        }
        if (newWord.length === 0) {
            setError("Word can't be empty")
            return
        }
        if (newDefinition.length === 0) {
            setError("Definition can't be empty")
            return
        }
        setWordsState({
            ...wordsState,
            words : [...wordsState.words, {
                word : newWord.toLowerCase(),
                definition: newDefinition,
                included: true
            }]
        })
        setNewWord("")
        setNewDefinition("")
    }
    
    const pageVariants : Variants = {
        initial: {
            x: '100%',
            opacity: 0,
        },
        appear: {
            x: '0%',
            opacity: 1,
        },
        exit: {
            x: '100%',
            opacity: 0,
        }
    }
    
    return (
        <motion.div
            className="column word-list-body"
            variants={pageVariants}
            initial="initial"
            animate="appear"
            exit="exit"
            transition={{ease: 'easeInOut'}}
        >
            <input onChange={e => setSearch(e.currentTarget.value)} value={search} className="search inpt" type="text" placeholder="Search"/>
            {
                error ? <div className="error">{error}</div> : ''
            }
            <form onSubmit={handleAdd} className="add-form">
                <input onChange={e => setNewWord(e.currentTarget.value)} value={newWord} className="new-word inpt" type="text" placeholder="Word" />
                <input onChange={e => setNewDefinition(e.currentTarget.value)} value={newDefinition} className="new-definition inpt" type="text" placeholder="Definition" />
                <button className="btn add" type="submit">+</button>
            </form>
            <motion.div layout="position" className="words">
                {
                    filterBySearch(wordsState.words, search).sort(wordCmp).map(
                        word => <WordBlock word={word} key={`${word.word}-${word.definition}`}/>
                    )
                }
            </motion.div>
        </motion.div>
    )
}