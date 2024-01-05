import { createContext, useContext, useState, useEffect } from 'react';

import { logRequest } from '../api/task.js';
import { notifications } from '../json/notification.js';

const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const [errors, setErrors] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const getNotification = (notification) => {
    const response = notifications;
    setNotification(response);
  };

  const logNotification = async (notification) => {
    try {
      const response = await logRequest(notification);
      const { data } = response;
      console.log(data);
      setNotification([...notification, data]);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <NotificationContext.Provider
      value={{ notification, errors, getNotification, logNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
