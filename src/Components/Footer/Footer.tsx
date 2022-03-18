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
            {
            [Page.Playing, Page.WordList].map(
                page => (
                    <button
                        key={`footer-button-${page}`}
                        onClick={handleClick(page)}
                        className={`footer-button ${page === currentPage ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))
            }
        </footer>
    )
}