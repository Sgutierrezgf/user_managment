import axios from "./axios";

const API = "http://localhost:3000/api/v1";

export const registerRequest = (user) => axios.post(`${API}/users`, user);
export const loginRequest = (user) => axios.post(`${API}/auth/login`, user);
export const verifyTokenRequest = () => axios.get(`${API}/auth/verify`);
export const addEmployee = (employee) =>
  axios.post(`${API}/employees`, employee);
export const updateEmployee = async (id, updatedEmployeeData) =>
  axios.patch(`${API}/employees/${id}`, updatedEmployeeData);
export const getEmployees = () => axios.get(`${API}/employees`);
export const deleteEmployeeRequest = async (id) =>
  axios.delete(`${API}/employees/${id}`, id);
export const getRequests = () => axios.get(`${API}/requests`);
export const addRequests = (request) => axios.post(`${API}/requests`, request);
