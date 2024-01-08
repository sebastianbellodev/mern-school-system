/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

import { getRequest, getByIdRequest } from '../api/format.js';

const FormatContext = createContext();

export const useFormat = () => {
  const context = useContext(FormatContext);

  if (!context) {
    throw new Error('useFormat must be used within a FormatProvider');
  }

  return context;
};

export const FormatProvider = ({ children }) => {
  const [format, setFormat] = useState([]);
  const [errors, setErrors] = useState([]);

  const getFormat = async () => {
    try {
      const response = await getRequest();
      console.log(response.data.formats);
      setFormat(response.data.formats);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const getFormatById = async (id) => {
    try {
      const response = await getByIdRequest(id);
      return response.data.format;
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
    <FormatContext.Provider
      value={{
        format,
        errors,
        getFormat,
        getFormatById,
      }}
    >
      {children}
    </FormatContext.Provider>
  );
};
