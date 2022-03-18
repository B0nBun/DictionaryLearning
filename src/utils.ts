import type { Word } from "./interfaces";

// Formatting for Local Storage
// JSON would be enough, but I think it wastes a lot of memory
export const setWordsToLs = (words : Word[]) => {
    const string = words.reduce((acc, word) => {
        return acc + `<${word.word}|${word.definition}>`
    }, '')
    localStorage.setItem('words', string)
}

export const getWordsFromLS = () : Word[] => {
    let string = localStorage.getItem('words')
    if (string === null) {
        setWordsToLs([])
        string = '[]'
    }
    let result : Word[] = []
    string.replaceAll(/<(.+?)\|(.*?)>/g, (sub : string, word : string, definition : string) => {
        result.push({
            word,
            definition
        })
        return sub
    })
    return result
}

export const last = <T extends unknown>(arr : T[]) => arr.length === 0 ? undefined : arr[arr.length - 1] 

export const shuffle = <T>(a : T[]) : T[] => {
    const array = [...a]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export const wordCmp = (a : Word, b : Word) => 
    a.word < b.word   ? -1 :
    a.word === b.word ?  0 :
    1