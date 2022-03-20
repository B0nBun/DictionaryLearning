import React, { useContext, useEffect, useRef } from "react"
import { Page } from "../../../interfaces"
import { pageContext } from "../../../Providers/PageProvider"
import { wordStorageContext } from "../../../Providers/WordStorage"

// TODO: `go back` button on android won't work so search for some event handler, idk
export default function WordEditBody() {
    const [wordsState, setWordsState] = useContext(wordStorageContext)
    const [, setCurrentPage] = useContext(pageContext)
    const textareaRef : React.LegacyRef<HTMLTextAreaElement> = useRef(null)

    const handleBackButton = () => {
        setCurrentPage(Page.WordList)
    }
    
    useEffect(() => {
        handleAutoResize()
        window.addEventListener('resize', handleAutoResize)
        window.addEventListener('popstate', handleBackButton)

        return () => {
            window.removeEventListener('resize', handleAutoResize)
            window.removeEventListener('popstate', handleBackButton)
        }
    // eslint-disable-next-line
    }, [])
    
    if (!wordsState.currentWord) return <div className="error">Error: current word is null</div>
    
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

    const handleAutoResize = () => {
        if (!textareaRef.current) return
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + 'px'
    }
    
    const handleDefinitionChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className="word-edit-body">
            <div className="word-edit-block">
                <label>Word:</label>
                <input className="name-edit inpt" onChange={handleWordChange} type="text" value={wordsState.currentWord.word}/>
            </div>
            <div className="word-edit-block">
                <label>Definition:</label>
                <textarea
                    ref={textareaRef}
                    spellCheck={false}
                    className="inpt definition-edit"
                    onChange={e => {
                        handleDefinitionChange(e)
                        handleAutoResize()
                    }}
                    value={wordsState.currentWord.definition}
                />
            </div>
            {
            wordsState.currentWord.definition.length === 0 ?
            <span className="error">Warning: Word will be deleted if it's defenition will be left empty</span> : ""
            }
        </div>
    ) 
}