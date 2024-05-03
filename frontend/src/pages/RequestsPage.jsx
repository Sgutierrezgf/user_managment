import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function RequestsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const employeeToUpdate = employees.find(
      (employee) => employee.id === parseInt(id)
    );
    setSelectedEmployee(employeeToUpdate);
  }, [id, employees]);
  console.log(employees);

  const handleReturnEmployees = () => {
    navigate("/employees");
  };
  return (
    <div className="bg-zinc-800 w-full p-10 rounded-md">
      <h1 className="text-2xl font-bold">Información del empleado</h1>
      <p>Nombre: {selectedEmployee ? selectedEmployee.Nombre : ""}</p>
      <p>
        Fecha de Ingreso:{" "}
        {selectedEmployee ? selectedEmployee.FechaIngreso.slice(0, 10) : ""}
      </p>
      <p>Salario: {selectedEmployee ? selectedEmployee.Salario : ""}</p>
      <h2 className="text-lg font-bold mt-4">Solicitudes:</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 w-1/3">Codigo</th>
              <th className="px-4 py-2 w-1/3">Descripción</th>
              <th className="px-4 py-2 w-1/3">Resumen</th>
            </tr>
          </thead>
          <tbody>
            {selectedEmployee?.requests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-gray-200 text-center"
              >
                <td className="px-4 py-2">{request.codigo}</td>
                <td className="px-4 py-2">{request.descripcion}</td>
                <td className="px-4 py-2">{request.resumen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
