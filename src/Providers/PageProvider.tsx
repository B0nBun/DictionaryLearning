import React, { useState } from 'react'
import { Page } from '../interfaces'

export const pageContext : React.Context<[Page, (page : Page) => void]>
    = React.createContext([
        (Page.WordList as Page),
        page => {}
    ])

interface Props {
    children : JSX.Element | JSX.Element[]
}
    
export default function PageProvider({children} : Props) {
    const [currentPage, setCurrentPage] = useState(Page.WordList)
    
    return (
        <pageContext.Provider value={[currentPage, setCurrentPage]}>{children}</pageContext.Provider>
    )
}