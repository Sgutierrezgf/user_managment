/* eslint-disable react/prop-types */

const EmployeeListItem = ({
  employee,
  handleDeleteEmployee,
  openViewModal,
  openUpdateModal,
}) => {
  return (
    <tr key={employee.id} className="border-b border-gray-200 text-center">
      <td className="px-4 py-2">{employee.FechaIngreso.slice(0, 10)}</td>
      <td className="px-4 py-2">{employee.Nombre}</td>
      <td className="px-4 py-2">{employee.Salario}</td>
      <td className="px-4 py-2">
        <button
          onClick={() => openViewModal(employee)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mr-2"
        >
          Ver
        </button>
        <button
          onClick={() => handleDeleteEmployee(employee.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
        <button
          onClick={() => openUpdateModal(employee)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Actualizar
        </button>
      </td>
    </tr>
  );
};

export default EmployeeListItem;
