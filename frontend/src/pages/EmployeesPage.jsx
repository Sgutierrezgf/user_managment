import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function EmployeesPage() {
  const { user, employees, deleteEmployee } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(null)
  const employeesPerPage = 5;
  const navigate = useNavigate();

  // Guardar la información del usuario en localStorage cuando se actualiza
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsers(parsedUser.user.role)
    }
  }, []);


  const isAdmin = users === 'admin'

  const filteredEmployees = employees.filter((employee) =>
    employee.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleURequestsEmployee = (id) => {
    navigate(`/employee/requests-employee/${id}`);
  };

  const handleAddEmployee = () => {
    navigate("/employee/add-employee");
  };

  const handleUpdateEmployee = (id) => {
    navigate(`/employee/update-employee/${id}`);
  };

  const handleDeleteEmployee = (id) => {
    deleteEmployee(id);
  };

  return (
    <div className="container mx-auto max-w-screen-lg py-8">
      <Navbar />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
      </div>

      <button
        onClick={handleAddEmployee}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mb-4"
      >
        Agregar Empleado
      </button>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Fecha Ingreso</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Salario</th>
              <th className="px-4 py-2">Solicitudes</th>
              {isAdmin && (
                <th className="px-4 py-2">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-gray-200 text-center"
              >
                <td className="px-4 py-2">
                  {employee.FechaIngreso.slice(0, 10)}
                </td>
                <td className="px-4 py-2">{employee.Nombre}</td>
                <td className="px-4 py-2">{employee.Salario}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleURequestsEmployee(employee.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  >
                    Ver
                  </button>
                </td>
                <td className="px-4 py-2">
                  {isAdmin && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleUpdateEmployee(employee.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      >
                        Actualizar
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEmployees.length / employeesPerPage)}
        paginate={paginate}
      />
    </div>
  );
}

export default EmployeesPage;
