import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

import { loginRequest, tokenRequest, updateRequest } from '../api/user.js';

export const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const login = async (user) => {
    try {
      const response = await loginRequest(user);
      const { data } = response;
      console.log(data);
      setUser(data);
      setAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.error]);
    }
  };

  const update = async (password) => {
      var updatedUser = {
        id : '65977be75e6f0dcd9728d59d',
        password : password
      }
      try {
        const response = await updateRequest(updatedUser);
        const { data } = response;
        console.log(data);
      } catch (error) {
        if (Array.isArray(error.response.data)) {
          return setErrors(error.response.data);
        }
        setErrors([error.response.data.error]);
      }
  
  } 

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkToken() {
      const cookies = Cookies.get();
      const { token } = cookies;

      if (!token) {
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await tokenRequest(token);
        const { data } = response;

        if (!data) {
          setAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }

        setAuthenticated(true);
        setUser(data);
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        update,
        authenticated,
        errors,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
