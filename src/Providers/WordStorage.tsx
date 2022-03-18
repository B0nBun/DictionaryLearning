import React, { useState } from 'react'
import type { SetStateCallback, Word } from '../interfaces'
import { getWordsFromLS, setWordsToLs } from '../utils'

interface WordState {
    words : Word[],
    currentWord : Word | null
}

type SetWordStateCallback = SetStateCallback<WordState>

export const wordStorageContext : React.Context<[WordState, (callback : SetWordStateCallback) => void]> 
    = React.createContext([
        {
            words : ([] as Word[]),
            currentWord: (null as Word | null)
        },
        callback => {}
    ])

interface Props {
    children : JSX.Element | JSX.Element[]
}

export default function WordStorageProvider({children} : Props) {
    const [wordsState, setWordsState] = useState({
        words : getWordsFromLS(),
        currentWord : (null as Word | null)
    })

    const setWordsStateLS = (callback : SetWordStateCallback) => {
        let resState = callback(wordsState)
        resState.words = resState.words.filter(word => word.word.length > 0)
        setWordsToLs(resState.words)
        setWordsState(resState)
    }
    
    return <wordStorageContext.Provider value={[wordsState, setWordsStateLS]}>{children}</wordStorageContext.Provider>
}
