import React, { useEffect, useState } from 'react'

export const notificationContext : React.Context<[
    string,
    (text : string) => void
]> 
    = React.createContext([
        "",
        text => {}
    ])

interface Props {
    children : JSX.Element | JSX.Element[]
}

export default function NotificationProvider({children} : Props) {
    const [notification, setNotification] = useState("")
    const [currentTimeout, setCurrentTimeout] = useState(null as NodeJS.Timeout | null)
    
    useEffect(() => {
        const prevTimeout = currentTimeout
        setCurrentTimeout(
            setTimeout(() => {
                setNotification("")
            }, 2000)
        )
        if (prevTimeout) clearTimeout(prevTimeout)        
    // eslint-disable-next-line
    }, [notification])
    
    const notify = (text : string) => setNotification(text)
    
    return <notificationContext.Provider value={[notification, notify]}>{children}</notificationContext.Provider>
}