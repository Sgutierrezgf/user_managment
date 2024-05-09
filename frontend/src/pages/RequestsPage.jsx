import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";

function RequestsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requests, deleteRequest, user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5; // Define the number of requests per page

  useEffect(() => {
    const employeeToUpdate = requests.find(
      (req) => req.employeeId === parseInt(id)
    );
    setSelectedEmployee(employeeToUpdate);
  }, [id, requests]);

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

  const handleReturnEmployees = () => {
    navigate("/employees");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter requests by employee ID and search term
  const filteredRequests = requests.filter((request) =>
    request.employeeId === parseInt(id) &&
    request.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
    }
  };

  const handleAddRequest = () => {
    navigate(`/employee/requests-employee/${id}/add-request`);
  };
  const handleUpdateRequest = (id) => {
    navigate(`/employee/requests-employee/${id}/update-request`);
  };


  return (
    <div className="bg-zinc-800 w-full p-10 rounded-md">
      <h1 className="text-2xl font-bold">Información del empleado</h1>
      <p>Nombre: {selectedEmployee ? selectedEmployee.employee.Nombre : ""}</p>
      <p>
        Fecha de Ingreso:{" "}
        {selectedEmployee ? selectedEmployee.employee.FechaIngreso.slice(0, 10) : ""}
      </p>
      <p>Salario: {selectedEmployee ? selectedEmployee.employee.Salario : ""}</p>
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
              {
                isAdmin && (
                  <th className="px-4 py-2">Acciones</th>
                )
              }
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
                {
                  isAdmin && (
                    <td className="px-4 py-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleUpdateRequest(request.id)}
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
                  )
                }

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
