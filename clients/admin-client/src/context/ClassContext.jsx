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
} from '../api/subject.js';

const SubjectContext = createContext();

export const useClass = () => {
  const context = useContext(SubjectContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};
export const ClassProvider = ({ children }) => {
  const [subject, setSubject] = useState([]);
  const [filterSubjects, setFilterSubject] = useState([]);
  const [errors, setErrors] = useState([]);

  const getClass = async () => {
    try {
      const response = await getRequest();
      setSubject(response.data.subjects);
      setFilterSubject(response.data.subjects);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const getClassById = async (id) => {
    try {
      const response = await getByIdRequest(id);
      return response.data.subjects;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const logClass = async (subject) => {
    try {
      await logRequest(subject);
      getClass();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const updateClass = async (subject) => {
    try {
      await updateRequest(subject);
      getClass();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const removeClass = async (id) => {
    try {
      const response = await removeRequest(id);
      if (response.status === 200) {
        setFilterSubject(subject.filter((subject) => subject.id !== id));
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
    <SubjectContext.Provider
      value={{
        subject,
        filterSubjects,
        errors,
        getClass,
        getClassById,
        logClass,
        updateClass,
        removeClass,
        setFilterSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};
