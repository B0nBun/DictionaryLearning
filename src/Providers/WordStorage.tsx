import React, { useState } from 'react'
import type { Word } from '../interfaces'
import { getWordsFromLS, setWordsToLs } from '../utils'

interface WordState {
    words : Word[],
    currentWord : Word | null
}

export const wordStorageContext : React.Context<[WordState, (wordState : WordState) => void]> 
    = React.createContext([
        {
            words : ([] as Word[]),
            currentWord: (null as Word | null)
        },
        wordState => {}
    ])

interface Props {
    children : JSX.Element | JSX.Element[]
}

export default function WordStorageProvider({children} : Props) {
    const [wordsState, setWordsState] = useState({
        words : getWordsFromLS(),
        currentWord : (null as Word | null)
    })

    const setWordsStateLS = (wordState : WordState) => {
        wordState.words = wordState.words.filter(word => word.word.length > 0 && word.definition.length > 0)
        setWordsToLs(wordState.words)
        setWordsState(wordState)
    }
    
    return <wordStorageContext.Provider value={[wordsState, setWordsStateLS]}>{children}</wordStorageContext.Provider>
}
