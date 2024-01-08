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
} from '../api/semester.js';

const SemesterContext = createContext();

export const useSemester = () => {
  const context = useContext(SemesterContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};

export const SemesterProvider = ({ children }) => {
  const [semester, setSemester] = useState([]);
  const [filterSemester, setFilterSemester] = useState([]);
  const [errors, setErrors] = useState([]);

  const getSemester = async () => {
    try {
      const response = await getRequest();
      setSemester(response.data.semesters);
      setFilterSemester(response.data.semesters);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const getSemesterById = async (id) => {
    try {
      const response = await getByIdRequest(id);
      return response.data.semester;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const logSemester = async (semester) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(semester)) {
        formData.append(key, value);
      }
      await logRequest(formData);
      getSemester();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const updateSemester = async (semester) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(semester)) {
        formData.append(key, value);
      }
      await updateRequest(formData);
      getSemester();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const removeSemester = async (id) => {
    try {
      const response = await removeRequest(id);
      const { data } = response;
      console.log(data);
      if (response.status === 200) {
        setFilterSemester(semester.filter((semester) => semester.id !== id));
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
    <SemesterContext.Provider
      value={{
        semester,
        filterSemester,
        errors,
        getSemester,
        getSemesterById,
        logSemester,
        updateSemester,
        removeSemester,
        setFilterSemester,
      }}
    >
      {children}
    </SemesterContext.Provider>
  );
};
