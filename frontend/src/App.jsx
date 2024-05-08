import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./Routes";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const EmployeesPage = lazy(() => import("./pages/EmployeesPage"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
const UpdateEmployeePage = lazy(() => import("./pages/UpdateEmployeePage"));
const RequestsPage = lazy(() => import("./pages/RequestsPage"));
const AddRequest = lazy(() => import("./pages/AddRequest"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
              <Route
                path="/employee/requests-employee/:id/add-request"
                element={<AddRequest />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;