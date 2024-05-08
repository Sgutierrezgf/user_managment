import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";

function RequestsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, deleteRequest } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  useEffect(() => {
    const employeeToUpdate = employees.find(
      (employee) => employee.id === parseInt(id)
    );
    setSelectedEmployee(employeeToUpdate);
  }, [id, employees]);

  const handleReturnEmployees = () => {
    navigate("/employees");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtrar las solicitudes por término de búsqueda y paginar
  const filteredRequests =
    selectedEmployee?.requests.filter((request) =>
      request.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const handleAddRequest = () => {
    navigate(`/employee/requests-employee/${id}/add-request`);
  };

  const handleDeleteRequest = (id) => {
    deleteRequest(id);
  }

  return (
    <div className="bg-zinc-800 w-full p-10 rounded-md">
      <h1 className="text-2xl font-bold">Información del empleado</h1>
      <p>Nombre: {selectedEmployee ? selectedEmployee.Nombre : ""}</p>
      <p>
        Fecha de Ingreso:{" "}
        {selectedEmployee ? selectedEmployee.FechaIngreso.slice(0, 10) : ""}
      </p>
      <p>Salario: {selectedEmployee ? selectedEmployee.Salario : ""}</p>
      <div>
        <input
          type="text"
          placeholder="Buscar por código"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
      </div>
      <button
        onClick={handleAddRequest}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-2/3"
      >
        Agregar nueva solicitud
      </button>
      <h2 className="text-lg font-bold mt-4">Solicitudes:</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 w-1/3">Codigo</th>
              <th className="px-4 py-2 w-1/3">Descripción</th>
              <th className="px-4 py-2 w-1/3">Resumen</th>

              <th className="px-4 py-2">Acciones</th>


            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-gray-200 text-center"
              >
                <td className="px-4 py-2">{request.codigo}</td>
                <td className="px-4 py-2">{request.descripcion}</td>
                <td className="px-4 py-2">{request.resumen}</td>
                <td className="px-4 py-2">

                  <div className="flex justify-center">
                    <button

                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => handleDeleteRequest(request.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Eliminar
                    </button>

                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredRequests.length / requestsPerPage)}
        paginate={paginate}
      />
      <button
        onClick={handleReturnEmployees}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Regresar a empleados
      </button>
    </div>
  );
}

export default RequestsPage;
