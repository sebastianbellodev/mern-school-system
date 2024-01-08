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
} from '../api/teacher.js';

const TeacherContext = createContext();

export const useTeacher = () => {
  const context = useContext(TeacherContext);

  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }

  return context;
};

export const TeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState([]);
  const [filterTeacher, setFilterTeacher] = useState([]);
  const [errors, setErrors] = useState([]);

  const getTeacher = async () => {
    try {
      const response = await getRequest();
      setTeacher(response.data.teachers);
      setFilterTeacher(response.data.teachers);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const getTeacherById = async (id) => {
    try {
      const response = await getByIdRequest(id);
      return response.data.teacher;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const logTeacher = async (teacher) => {
    try {
      await logRequest(teacher);
      getTeacher();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const updateTeacher = async (teacher) => {
    try {
      await updateRequest(teacher);
      getTeacher();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const removeTeacher = async (id) => {
    try {
      const response = await removeRequest(id);
      const { data } = response;
      if (response.status === 200) {
        setFilterTeacher(teacher.filter((teacher) => teacher.id !== id));
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
    <TeacherContext.Provider
      value={{
        teacher,
        filterTeacher,
        errors,
        getTeacher,
        getTeacherById,
        logTeacher,
        updateTeacher,
        removeTeacher,
        setFilterTeacher,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
