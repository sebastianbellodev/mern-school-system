/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

import { getRequest, getByIdRequest } from '../api/notification.js';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const [filterNotification, setFilterNotification] = useState([]);
  const [errors, setErrors] = useState([]);

  const getNotification = async () => {
    try {
      const response = await getRequest();
      setNotification(response.data.notifications);
      setFilterNotification(response.data.notifications);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const getNotificationById = async (id) => {
    try {
      const response = await getByIdRequest(id);
      return response.data.notification;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        filterNotification,
        errors,
        getNotification,
        getNotificationById,
        setFilterNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
