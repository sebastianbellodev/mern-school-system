import { createContext, useContext, useState, useEffect } from 'react';

import { getGroupSubjectsRequest } from '../api/courses.js';

const CoursesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCourse = () => {
  const context = useContext(CoursesContext);

  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const CoursesProvider = ({ children }) => {
  const [course, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [errors, setErrors] = useState([]);

  const getCoursesByStudent = async (group) => {
    try {
      const response = await getGroupSubjectsRequest(group);
      setCourses(response.data.subjects);
      setFilterCourses(response.data.subjects);
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
    <CoursesContext.Provider
      value={{
        course,
        filterCourses,
        errors,
        getCoursesByStudent,
        setFilterCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
