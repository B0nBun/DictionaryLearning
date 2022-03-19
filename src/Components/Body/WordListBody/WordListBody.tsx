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
    const [wordsState, setWordsState] = useContext(wordStorageContext)
    
    const handleWordClick = () => {
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
    
    return (
        <div className="words-item">
            <span tabIndex={0} onClick={handleWordClick} className="word-text" style={{}}>
                {word.word} {word.definition ? '-' : ''} {word.definition}
            </span>
            <button className={`btn ${word.included ? '' : 'active'}`} onClick={handleWordToggle}>{word.included ? 'I' : 'E'}</button>
            <button className="btn" onClick={handleWordRemove}>X</button>
        </div>
    )
}

// TODO: `go back up` button
// TODO: Think about where to put reset button (maybe in some submenu)
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
    
    return (
        <div className="column word-list-body">
            <input onChange={e => setSearch(e.currentTarget.value)} value={search} className="search inpt" type="text" placeholder="Search"/>
            {
                error ? <div>{error}</div> : ''
            }
            <form onSubmit={handleAdd} className="add-form">
                <input onChange={e => setNewWord(e.currentTarget.value)} value={newWord} className="new-word inpt" type="text" placeholder="Word" />
                <input onChange={e => setNewDefinition(e.currentTarget.value)} value={newDefinition} className="new-definition inpt" type="text" placeholder="Definition" />
                <button className="btn add" type="submit">+</button>
            </form>
            <div className="words">
                {
                    filterBySearch(wordsState.words, search).sort(wordCmp).map(
                        (word, idx) => <WordBlock word={word} key={`${word.word}-${idx}`}/>
                    )
                }
            </div>
            {/* <button className="btn reset" onClick={() => setWordsState({...wordsState, words: []})}>Reset All</button> */}
        </div>
    )
}