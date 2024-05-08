/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  addEmployee,
  updateEmployee,
  deleteEmployeeRequest,
  deleteEmployeeRequests,
  getEmployees,
  addRequests,
  getRequests
} from "../api/auth";
import Cookies from "js-cookie";

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
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [errors, setErrors] = useState([]);
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsAuthenticated(true);
      // Restore isAdmin state from cookies
      return;
    }
  }, []);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data.user); // Asumiendo que el token está en res.data.user
      setIsAuthenticated(true);
      Cookies.set("authToken", res.data.token);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      Cookies.set("authToken", res.data.token);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  // console.log(user);
  const logout = () => {
    // Eliminar el token de autenticación de las cookies al cerrar sesión
    Cookies.remove("authToken");

    // Limpiar el localStorage
    localStorage.removeItem("user");

    // Limpiar el estado del usuario y la autenticación
    setUser(null);
    setIsAuthenticated(false);
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

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const requestData = await getRequests();

        setRequest(requestData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequestData();
  }, []);


  const addNewEmployee = async (employee) => {
    try {
      const res = await addEmployee(employee);
      setEmployee(res.data);
      setIsAuthenticated(true);
      setEmployees([...employees, res.data]);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const addNewRequest = async (solicitudes) => {
    try {
      const res = await addRequests(solicitudes);
      setRequests(res.data);
      setIsAuthenticated(true);
      setRequests([...requests, res.data]);
      console.log(requests);
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

  const deleteRequest = async (id) => {
    try {
      const res = await deleteEmployeeRequests(id);
      console.log(id);
      if (res.status === 204) {
        setEmployees(requests.filter((req) => req.id !== id));
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
        addNewRequest,
        requests,
        request,
        deleteEmployee,
        updateEmployees,
        logout,
        deleteRequest
        // isAdmin,
        // loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
