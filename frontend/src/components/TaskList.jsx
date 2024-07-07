import React, { useEffect, useState } from 'react';
import { messaging } from '../firebase';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      // Replace with your API call to fetch tasks from your backend
      try {
        // Example API call to fetch tasks from your backend
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data.tasks); // Assuming 'tasks' is an array of task objects
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();

    // Handle foreground messages when the component mounts
    const handleForegroundMessage = async () => {
      try {
        const currentToken = await messaging.getToken();
        console.log('Current FCM Token:', currentToken);

        messaging.onMessage((message) => {
          console.log('Foreground message received:', message);
          // Handle notification in your app UI
          // Update tasks state, show a modal, etc.
          // For example, update tasks when a task update notification is received
          if (message.data && message.data.taskId) {
            const updatedTasks = tasks.map(task => {
              if (task.id === message.data.taskId) {
                // Update task details or mark as updated
                return {
                  ...task,
                  status: 'updated', // Example: Update status to trigger UI change
                };
              }
              return task;
            });
            setTasks(updatedTasks);
          }
        });
      } catch (error) {
        console.error('Error handling foreground message:', error);
      }
    };

    handleForegroundMessage();

    return () => {
      // Clean up subscriptions when the component unmounts
      messaging.onMessage(() => {});
    };
  }, [tasks]); // Include 'tasks' in dependencies if it affects the subscription

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
