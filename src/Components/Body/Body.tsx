import { useContext } from "react"
import { Page } from "../../interfaces"
import { pageContext } from "../../Providers/PageProvider"
import PlayingBody from "./PlayingBody/PlayingBody"
import WordListBody from "./WordListBody/WordListBody"
import WordEditBody from "./WordEditBody/WordEditBody"
import { AnimatePresence } from "framer-motion"

export default function Body() {
    const [currentPage] = useContext(pageContext)
    
    return (
        <div className="main-body">
        <AnimatePresence exitBeforeEnter={true}>
            {
                currentPage === Page.WordList ? <WordListBody key="word-list"/> :
                currentPage === Page.Playing  ? <PlayingBody  key="playing-body"/>  :
                currentPage === Page.WordEdit ? <WordEditBody key="word-edit"/> :
                <div>Can't display {currentPage} page</div>
            }
        </AnimatePresence>
        </div>
    )
}