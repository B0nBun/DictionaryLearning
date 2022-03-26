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
background-color: var(--notification-bg-clr);
color: var(--notification-fg-clr);
padding: .5em 1em;
border-radius: .2em;
font-size: 1.2rem;
@media (max-width: 700px) {
    position: absolute;
    top: 2rem;
    left: 1rem;
    right: 1rem;
}`)


export default function Notification() {
    const [notification] = useContext(notificationContext)

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
                    {notification}
                </NotificationWrapper>
            }
        </AnimatePresence>
    )
}