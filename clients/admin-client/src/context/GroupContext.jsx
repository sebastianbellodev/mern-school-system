/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';

import { getRequest } from '../api/group.js';

const GroupContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGroup = () => {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useGroup must be used within a GroupProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState([]);
  const [errors, setErrors] = useState([]);

  const getGroup = async () => {
    try {
      const response = await getRequest();
      setGroup(response.data.groups);
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
    <GroupContext.Provider value={{ group, errors, getGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
