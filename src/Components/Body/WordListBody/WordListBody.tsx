import React, { useContext, useState } from "react"
import { Page, Word } from "../../../interfaces"
import { pageContext } from "../../../Providers/PageProvider"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { filterBySearch, wordCmp } from "../../../utils"

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

    const handleWordToggle = () => {
        setWordsState(state => ({
            ...state,
            words: state.words.map(w => w.word === word.word ? {
                ...word,
                included: !word.included
            } : w)
        }))
    }
    
    return (
        <div className="row" style={{maxWidth: '100vw'}}>
            <span onClick={handleWordClick} style={{flex: '1 1 auto', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {word.word} {word.definition ? '-' : ''} {word.definition}
            </span>
            <button onClick={handleWordToggle}>{word.included ? 'I' : 'E'}</button>
            <button onClick={handleWordRemove}>X</button>
        </div>
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
        if (!newWord) return
        if (wordsState.words.some(word => word.word.toUpperCase() === newWord.toUpperCase())) {
            setError(`Word '${newWord}' already exists in the dictionary`)
            return
        }
        if (newWord.match(/[<>\|]/)) {
            setError("`< > |` symbols are reserved, you can't use them in words")
            return
        }
        setWordsState(state => ({
            ...state,
            words : [...state.words, {
                word : newWord.toLowerCase(),
                definition: newDefinition,
                included: true
            }]
        }))
        setNewWord("")
        setNewDefinition("")
    }
    
    return (
        <div className="column">
            <input onChange={e => setSearch(e.currentTarget.value)} value={search} type="text" placeholder="Search" style={{marginBottom: '1rem'}}/>
            {
                error ? <div>{error}</div> : ''
            }
            <form onSubmit={handleAdd} className="column">
                <input onChange={e => setNewWord(e.currentTarget.value)} value={newWord} type="text" placeholder="Word" />
                <input onChange={e => setNewDefinition(e.currentTarget.value)} value={newDefinition} type="text" placeholder="Definition" />
                <button type="submit">Add</button>
            </form>
            <button onClick={() => setWordsState(state => ({...state, words: []}))}>Reset All</button>
            {
                filterBySearch(wordsState.words, search).sort(wordCmp).map((word, idx) => <WordBlock word={word} key={`${word.word}-${idx}`}/>)
            }
        </div>
    )
}