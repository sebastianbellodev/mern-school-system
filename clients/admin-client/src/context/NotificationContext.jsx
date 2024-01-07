/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

import {
  getRequest,
  getByIdRequest,
  logRequest,
  updateRequest,
  removeRequest,
} from '../api/notification.js';

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

  const logNotification = async (notification) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(notification)) {
        formData.append(key, value);
      }
      await logRequest(formData);
      getNotification();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const updateNotification = async (notification) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(notification)) {
        formData.append(key, value);
      }
      await updateRequest(formData);
      getNotification();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const removeNotification = async (id) => {
    try {
      const response = await removeRequest(id);
      const { data } = response;
      console.log(data);
      if (response.status === 204) {
        setFilterNotification(
          notification.filter((notification) => notification.id !== id)
        );
      }
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
      value={{
        notification,
        filterNotification,
        errors,
        getNotification,
        getNotificationById,
        logNotification,
        updateNotification,
        removeNotification,
        setFilterNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
