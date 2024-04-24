import React from 'react'
import Notifications from '../components/InboxNotification/InboxNotification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Inbox = () => {
    return(
        <main>
            <h1>Notifications <FontAwesomeIcon icon={faBell} /></h1>
            <Notifications />
        </main>
    )
    }
    
    export default Inbox