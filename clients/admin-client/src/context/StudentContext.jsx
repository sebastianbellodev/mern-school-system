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
} from '../api/student.js';

const StudentContext = createContext();

export const useStudent = () => {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }

  return context;
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState([]);
  const [filterStudent, setFilterStudent] = useState([]);
  const [errors, setErrors] = useState([]);

  const getStudent = async () => {
    try {
      const response = await getRequest();
      setStudent(response.data.students);
      setFilterStudent(response.data.students);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const getStudentById = async (id) => {
    try {
      const response = await getByIdRequest(id);
      return response.data.student;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const logStudent = async (student) => {
    try {
      await logRequest(student);
      getStudent();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const updateStudent = async (teacher) => {
    try {
      await updateRequest(teacher);
      getStudent();
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const removeStudent = async (id) => {
    try {
      const response = await removeRequest(id);
      if (response.status === 200) {
        setFilterStudent(student.filter((student) => student.id !== id));
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
    <StudentContext.Provider
      value={{
        student,
        filterStudent,
        errors,
        getStudent,
        getStudentById,
        logStudent,
        updateStudent,
        removeStudent,
        setFilterStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
