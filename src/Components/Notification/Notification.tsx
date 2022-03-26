import { useContext } from "react";
import { notificationContext } from "../../Providers/NotificationProvider";

function NotificationWrapper({text} : {text : string}) {
    return (
        <div className="notification">
            {text}
        </div>
    )
}

export default function Notification() {
    const [notification] = useContext(notificationContext)

    return notification.length > 0 ? <NotificationWrapper text={notification}/> : <></>
}