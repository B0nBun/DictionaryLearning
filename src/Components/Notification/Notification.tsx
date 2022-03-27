import { useContext } from "react";
import { notificationContext } from "../../Providers/NotificationProvider";
import styled from '@emotion/styled'
import { AnimatePresence, motion } from "framer-motion";

const NotificationWrapper = styled(motion.div)(`
--notification-bg-clr: hsla(0, 70%, 65%, .7);
--notification-fg-clr: #fff;
position: absolute;
top: 2rem;
left: 2rem;
border-radius: .2em;
overflow: hidden;
font-size: 1.2rem;
display: flex;
flex-direction: row;
gap: 3px;

& > * {
    padding: .5em 1em;
    background-color: var(--notification-bg-clr);
    color: var(--notification-fg-clr);
}

& > span {
    flex: 1 1 auto;
}

& > button {
    border: none;
    cursor: pointer;
    transition: filter .2s ease;
}

& > button:hover {
    filter: brightness(1.3);
}

@media (max-width: 700px) {
    position: absolute;
    top: 2rem;
    left: 1rem;
    right: 1rem;

    & > button {
        min-width: 5em;
    }
}`)


// TODO: Button to close notification
//       and longer timeout before it closes itself
// TODO: List of notifications instead of one notification
export default function Notification() {
    const [notification, notify] = useContext(notificationContext)

    const animationProps = {
        initial : {
            opacity: 0,
            y: '-70%'
        },
        animate : {
            opacity: 1,
            y: '0%'
        },
        exit : {
            opacity: 0,
            y: '-70%'
        },
        transition: {ease: 'easeInOut'}
    }
    
    return (
        <AnimatePresence exitBeforeEnter={true}>
            {notification.length > 0 &&
                <NotificationWrapper {...animationProps}>
                    <span>
                    {notification}
                    </span>
                    <button onClick={() => notify("")}>✕</button>
                </NotificationWrapper>
            }
        </AnimatePresence>
    )
}