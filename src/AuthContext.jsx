import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (token) {
      setLogged(true); // Logged if token is found in localStorage.
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ logged, setLogged, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Child are react elements
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
