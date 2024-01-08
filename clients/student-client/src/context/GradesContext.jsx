import { createContext, useContext, useState, useEffect } from 'react';
import { getGradeStudentRequest } from '../api/grades.js';

const GradeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGrade = () => {
  const context = useContext(GradeContext);

  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const GradeProvider = ({ children }) => {
  const [grade, setGrade] = useState([]);
  const [filterGrades, setFilterGrades] = useState([]);
  const [errors, setErrors] = useState([]);

  const getGradesByStudent = async (student) => {
    try {
      const response = await getGradeStudentRequest(student);
      setGrade(response.data.grade);
      setFilterGrades(response.data.grade);
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
    <GradeContext.Provider
      value={{
        grade,
        errors,
        filterGrades,
        getGradesByStudent,
        setFilterGrades,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
