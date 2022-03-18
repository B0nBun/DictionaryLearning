import { useContext } from "react"
import { Page } from "../../interfaces"
import { pageContext } from "../../Providers/PageProvider"
import PlayingBody from "./PlayingBody/PlayingBody"
import WordListBody from "./WordListBody/WordListBody"
import WordEditBody from "./WordEditBody/WordEditBody"

const getBodyPage = (page : Page) : JSX.Element => 
    page === Page.WordList ? <WordListBody/> :
    page === Page.Playing  ? <PlayingBody/>  :
    page === Page.WordEdit ? <WordEditBody/> :
    <div>Can't display {page} page</div>

export default function Body() {
    const [currentPage] = useContext(pageContext)
    
    return (
        <div className="main-body">
            {getBodyPage(currentPage)}
        </div>
    )
}