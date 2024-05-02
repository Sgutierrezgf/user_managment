import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

function EmployeesPage() {
  const { employees } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const navigate = useNavigate();

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

  const handleAddEmployee = () => {
    navigate("/employee/add-employee");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Información del empleado</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
      </div>
      <button
        onClick={handleAddEmployee}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-2/3"
      >
        Agregar Empleado
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Fecha Ingreso</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Salario</th>
            <th className="px-4 py-2">Acciones</th>
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
              <td className="px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEmployees.length / employeesPerPage)}
        paginate={paginate}
      />
    </div>
  );
}

export default EmployeesPage;
