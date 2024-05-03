import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import { ProtectedRoute } from "./Routes";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";
import RequestsPage from "./pages/RequestsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employee/add-employee" element={<AddEmployee />} />
            <Route
              path="/employee/update-employee/:id"
              element={<UpdateEmployeePage />}
            />
            <Route
              path="/employee/requests-employee/:id"
              element={<RequestsPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
