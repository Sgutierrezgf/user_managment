import axios from "./axios";

const API = "http://localhost:3000/api/v1";

export const registerRequest = (user) => axios.post(`${API}/users`, user);
export const loginRequest = (user) => axios.post(`${API}/auth/login`, user);
export const verifyTokenRequest = () => axios.get(`${API}/auth/verify`);
export const addEmployee = (employee) =>
  axios.post(`${API}/employees`, employee);
export const updateEmployee = async (employee) =>
  axios.put(`${API}/employees/${employee.id}`, employee);
export const getEmployees = () => axios.get(`${API}/employees`);
export const deleteEmployeeRequest = async (id) =>
  axios.delete(`${API}/employees/${id}`, id);
