/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';

import { getRequest } from '../api/type.js';

const TypeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useType = () => {
  const context = useContext(TypeContext);

  if (!context) {
    throw new Error('useType must be used within a TypeProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const TypeProvider = ({ children }) => {
  const [type, setType] = useState([]);
  const [errors, setErrors] = useState([]);

  const getType = async () => {
    try {
      const response = await getRequest();
      setType(response.data.types);
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
    <TypeContext.Provider value={{ type, errors, getType }}>
      {children}
    </TypeContext.Provider>
  );
};
