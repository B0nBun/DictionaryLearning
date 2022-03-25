import React, { useContext, useEffect, useRef } from "react"
import { Page } from "../../../interfaces"
import { pageContext } from "../../../Providers/PageProvider"
import { wordStorageContext } from "../../../Providers/WordStorage"
import { motion } from 'framer-motion'

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
        <motion.div
            className="word-edit-body"
            initial={{
                x: '-100%',
                opacity: 0,
            }}
            animate={{
                x: '0%',
                opacity: 1
            }}
            exit={{
                x: '-100%',
                opacity: 0,
            }}
            transition={{ease: 'easeInOut'}}
        >
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
        </motion.div>
    ) 
}