import React, { useContext } from "react"
import { wordStorageContext } from "../../../Providers/WordStorage"

// TODO: `go back` button on android won't work so search for some event handler, idk
export default function WordEditBody() {
    const [wordsState, setWordsState] = useContext(wordStorageContext)

    if (!wordsState.currentWord) return <div className="column">Error: current word is null</div>
    
    const handleWordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (!wordsState.currentWord) return
        setWordsState({
            currentWord: {
                ...wordsState.currentWord!,
                word : e.currentTarget.value
            },
            words: wordsState.words.map(word => {
                if (word.word === wordsState.currentWord!.word) {
                    return {
                        ...word,
                        word: e.currentTarget.value,
                    }
                }
                return word
            })
        })
    }

    const handleDefinitionChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (!wordsState.currentWord) return
        setWordsState({
            currentWord: {
                ...wordsState.currentWord!,
                definition : e.currentTarget.value,
            },
            words: wordsState.words.map(word => {
                if (word.word === wordsState.currentWord!.word) {
                    return {
                        ...word,
                        definition : e.currentTarget.value,
                    }
                }
                return word
            })
        })
    }    
    return (
        <div className="column">
            <input onChange={handleWordChange} type="text" value={wordsState.currentWord.word}/>
            <input onChange={handleDefinitionChange} type="text" value={wordsState.currentWord.definition} />
            {
            wordsState.currentWord.definition.length === 0 ?
            <span>Warning: Word will be deleted if it's defenition will be left empty</span> : ""
            }
        </div>
    ) 
}