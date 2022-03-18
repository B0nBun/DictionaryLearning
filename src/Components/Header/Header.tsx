import React, { useContext, useEffect } from 'react'
import { Page } from '../../interfaces'
import { pageContext } from '../../Providers/PageProvider'

export default function Header() {
    const [currentPage, setCurrentPage] = useContext(pageContext)

    const goBack = () => setCurrentPage(Page.WordList)
    
    useEffect(() => {
        const goBackKeyboard = (e : KeyboardEvent) => {
            if (e.key !== 'Escape' && e.key !== 'Backspace') return
            goBack()
        }

        document.addEventListener('keydown', goBackKeyboard)

        return () => document.removeEventListener('keydown', goBackKeyboard)
    // eslint-disable-next-line
    }, [])
    
return (
        <header className="main-header">
            {currentPage === Page.WordEdit ? <button className="goback" onClick={goBack}>{'<'}</button> : <></>}
            <span className="page-name">
                {currentPage}
            </span>
            {currentPage === Page.WordEdit ? <div className="spacer" ></div> : <></>}
        </header>
    )
}