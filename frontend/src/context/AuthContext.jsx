/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  registerRequest,
  loginRequest,
  addEmployee,
  updateEmployee,
  deleteEmployeeRequest,
  // verifyTokenRequest,
} from "../api/auth";
// import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const addNewEmployee = async (employee) => {
    try {
      const res = await addEmployee(employee);
      setEmployee(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await deleteEmployeeRequest(id);
      if (res.status === 204)
        setEmployee(employee.filter((emp) => emp.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployees = async (id, employee) => {
    try {
      await updateEmployee(id, employee);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
        signin,
        addNewEmployee,
        employee,
        deleteEmployee,
        updateEmployees,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
