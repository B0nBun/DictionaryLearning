import React, { useContext } from 'react'
import { pageContext } from '../../Providers/PageProvider'
import { Page } from '../../interfaces'

export default function Footer() {
    const [currentPage, setCurrentPage] = useContext(pageContext)

    const handleClick = (page : Page) => (e : React.MouseEvent<HTMLButtonElement>) => {
        setCurrentPage(page)
    }
    
    return (
        <footer className="main-footer">
            <button
                key={`footer-button-${Page.Playing}`}
                onClick={handleClick(Page.Playing)}
                className={`footer-button ${Page.Playing === currentPage ? 'active' : ''}`}
            >
                {Page.Playing}
            </button>
            <button
                key={`footer-button-${Page.WordList}`}
                onClick={handleClick(Page.WordList)}
                className={`footer-button ${[Page.WordList, Page.WordEdit].some(p => p === currentPage) ? 'active' : ''}`}
            >
                {Page.WordList}
            </button>
        </footer>
    )
}