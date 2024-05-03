/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  addEmployee,
  updateEmployee,
  deleteEmployeeRequest,
  getEmployees,
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
  const [employees, setEmployees] = useState([]);
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

  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const employeesData = await getEmployees();

        setEmployees(employeesData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeesData();
  }, []);
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
      if (res.status === 204) {
        setEmployees(employees.filter((emp) => emp.id !== id));
      } else {
        console.error("Error al eliminar empleado:", res.status);
      }
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  const updateEmployees = async (id, updatedEmployeeData) => {
    try {
      await updateEmployee(id, updatedEmployeeData);
      setEmployees(
        employees.map((emp) =>
          emp.id === id ? { ...emp, ...updatedEmployeeData } : emp
        )
      );
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
        employees,
        deleteEmployee,
        updateEmployees,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
