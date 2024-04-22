import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InboxNotification.css';


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [olderNotifications, setOlderNotifications] = useState([]);
    const [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
    
        axios
            .get('http://localhost:5151/notifications', {

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const reversedData = res.data.data.reverse(); // getting the newest ones first
                const recentNotifications = reversedData.slice(0, 5); // get the 5 most recent notifications
                const olderNotifications = reversedData.slice(5); // get the older notifications
                setNotifications(recentNotifications);
                setOlderNotifications(olderNotifications);
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, []);

    const handleOlderNotifications = () => {
        setNotifications([...notifications, ...olderNotifications]);
        setOlderNotifications([]);
        setToggle(true);
    };


    const timeDiff = (timestamp) => {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60); 
        const days = Math.floor(hours / 24); 

        if (minutes < 1) {
            return 'Just now';
        } else if (minutes == 1) {
            return '1 minute ago';
        } else if (minutes < 60) {
            return `${minutes} minutes ago`; 
        } else if (hours == 1) {
            return '1 hour ago';
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (hours > 24){
            return `${days} days ago`;
        }
    };
    
    return (
        <ul className='Notifications-list'>
            {notifications.map((notification, index) => (
                <li key={notification._id} className={index < 3 ? 'New-notification' : ''}>
                    <div >
                        <p>{notification.content}</p>
                        <p className='Notification-time'>{timeDiff(notification.createdAt)}</p>
                    </div>
                </li>
            ))}
            <button className='main-menu-btn' onClick={handleOlderNotifications}>Show older notifications</button>
            
            {toggle && olderNotifications.map((notification) => (
                <li key={notification._id}>
                    <div>
                        <p>{notification.content}</p>
                        <p className='Notification-time'>{timeDiff(notification.createdAt)}</p>
                    </div>
                </li>
            ))}
        </ul>
        
    );
};

export default Notifications;