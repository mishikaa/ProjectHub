import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    socket.on('newNotification', (notification) => {
      toast.success(notification.message);
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  };

  return (
    <div>
      <h1>Notification System</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            {notification.message} - {new Date(notification.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
