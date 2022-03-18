import React, { useContext, useState } from "react"
import { Page, Word } from "../../../interfaces"
import { pageContext } from "../../../Providers/PageProvider"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { wordCmp } from "../../../utils"

interface WordProps {
    word : Word,
}

const WordBlock = ({word} : WordProps) : JSX.Element => {
    const [, setCurrentPage] = useContext(pageContext)
    const [, setWordsState] = useContext(wordStorageContext)
    
    const handleWordClick = () => {
        setCurrentPage(Page.WordEdit)
        setWordsState(state => ({
            ...state,
            currentWord : word
        }))
    }

    const handleWordRemove = () => {
        setWordsState(state => ({
            ...state,
            words: state.words.filter(w => w.word !== word.word)
        }))
    }
    
    // TODO: Display the start of the definition
    return (
        <div className="row" style={{maxWidth: '100vw'}}>
            <span onClick={handleWordClick} style={{flex: '1 1 auto', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {word.word} - {word.definition}
            </span>
            <button onClick={handleWordRemove}>X</button>
        </div>
    )
}

// TODO: Add the search function
// TODO: Add the feature to either include or exclude words from `playingWords`
export default function WordListBody() {
    const [wordsState, setWordsState] = useContext(wordStorageContext)
    
    const [newWord, setNewWord] = useState("")
    const [newDefinition, setNewDefinition] = useState("")
    const [error, setError] = useState("")

    const handleAdd = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!newWord) return
        if (wordsState.words.some(word => word.word === newWord)) {
            setError("You can't add same words")
            return
        }
        setWordsState(state => ({
            ...state,
            words : [...state.words, {
                word : newWord,
                definition: newDefinition
            }]
        }))
        setNewWord("")
        setNewDefinition("")
    }
    
    return (
        <div className="column">
            {
                error ? <div>{error}</div> : ''
            }
            <form onSubmit={handleAdd} className="column">
                <input onChange={e => {setNewWord(e.currentTarget.value)}} value={newWord} type="text" placeholder="Word" />
                <input onChange={e => {setNewDefinition(e.currentTarget.value)}} value={newDefinition} type="text" placeholder="Definition" />
                <button type="submit">Add</button>
            </form>
            <button onClick={() => setWordsState(state => ({...state, words: []}))}>Reset All</button>
            {
                wordsState.words.sort(wordCmp).map((word, idx) => <WordBlock word={word} key={`${word.word}-${idx}`}/>)
            }
        </div>
    )
}