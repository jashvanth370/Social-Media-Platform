import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationApi from '../api/notificationApi';
import { jwtDecode } from 'jwt-decode';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const decoded = jwtDecode(token);
                const userId = decoded.id || decoded._id;
                const data = await notificationApi.getNotifications(userId);
                setNotifications(data);
            } catch (error) {
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notification) => {
        if (!notification.isRead) {
            await notificationApi.markAsRead(notification._id);
            setNotifications((prev) => prev.map(n => n._id === notification._id ? { ...n, isRead: true } : n));
        }
        if (notification.url) {
            navigate(notification.url);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Notifications</h2>
            {loading ? (
                <div>Loading...</div>
            ) : notifications.length === 0 ? (
                <div className="text-muted">No notifications</div>
            ) : (
                <ul className="list-group">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className={`list-group-item d-flex align-items-center${notification.isRead ? '' : ' list-group-item-info fw-bold'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <i className={`bi me-3 ${notification.type === 'like' ? 'bi-hand-thumbs-up' : notification.type === 'comment' ? 'bi-chat-left-text' : 'bi-person-plus'}`}></i>
                            <span>{notification.message || `${notification.type} notification`}</span>
                            <span className="ms-auto small text-muted">{new Date(notification.createdAt).toLocaleString()}</span>
                            {!notification.isRead && <span className="badge bg-primary ms-2">New</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
} 