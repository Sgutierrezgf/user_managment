import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeRequests, setEmployeeRequests] = useState([]);
  const employeesPerPage = 5;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addNewEmployee, deleteEmployee, updateEmployee } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedEmployee(null);
    setUpdateModalIsOpen(false);
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    fetch(`http://localhost:3000/api/v1/requests?id=${employee.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Filtrar las solicitudes para el empleado actual
        const employeeRequests = data.filter(
          (request) => request.employeeId === employee.id
        );
        setEmployeeRequests(employeeRequests);
      })
      .catch((error) =>
        console.error("Error fetching employee requests:", error)
      );
    setViewModalIsOpen(true);
  };
  const closeViewModal = () => {
    setSelectedEmployee(null);
    setEmployeeRequests([]);
    setViewModalIsOpen(false);
  };

  const onSubmitAdd = handleSubmit(async (values) => {
    await addNewEmployee(values);
    setSuccessMessage("Empleado agregado exitosamente");
    closeAddModal();
    setTimeout(() => {
      setSuccessMessage("");
      reset();
    }, 3000);
  });

  const onSubmitUpdate = handleSubmit(async (values) => {
    await updateEmployee(selectedEmployee.id, values);
    setSuccessMessage("Empleado actualizado exitosamente");
    closeUpdateModal();
    setTimeout(() => {
      setSuccessMessage("");
      reset();
    }, 3000);
  });

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Información del empleado</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar empleado"
          value={searchTerm}
          onChange={handleSearch}
          className="bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
      </div>
      <button
        onClick={openAddModal}
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
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex">
            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none focus:ring-0 active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
            </li>
            {Array.from({
              length: Math.ceil(employees.length / employeesPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500 ${
                    currentPage === index + 1 ? "bg-neutral-100" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(employees.length / employeesPerPage)
                }
              >
                {">"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        className="flex h-[calc(100hv-100px)] items-center justify-center"
      >
        <div className="flex h-[calc(100hv-100px)] items-center justify-center">
          <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h1 className="text-2xl font-bold">Nuevo empleado</h1>
            <form onSubmit={onSubmitAdd}>
              <h3>Fecha de ingreso</h3>
              <input
                type="date"
                {...register("FechaIngreso", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              />
              {errors.fechaIngreso && (
                <p className="text-red-500">Fecha Ingreso is required</p>
              )}
              <h3>Nombre</h3>
              <input
                type="text"
                {...register("Nombre", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              />
              {errors.Nombre && (
                <p className="text-red-500">Nombre is required</p>
              )}
              <h3>Salario</h3>
              <input
                type="number"
                {...register("Salario", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              />
              {errors.Salario && (
                <p className="text-red-500">Salario is required</p>
              )}
              <button type="submit">Agregar empleado</button>
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        className="flex h-[calc(100hv-100px)] items-center justify-center"
      >
        <div className="flex h-[calc(100hv-100px)] items-center justify-center">
          <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h1 className="text-2xl font-bold">Actualizar empleado</h1>
            <form onSubmit={onSubmitUpdate}>
              <h3>Fecha de ingreso</h3>
              <input
                type="date"
                defaultValue={
                  selectedEmployee ? selectedEmployee.FechaIngreso : ""
                }
                {...register("FechaIngreso", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              />
              {errors.FechaIngreso && (
                <p className="text-red-500">Fecha Ingreso is required</p>
              )}
              <h3>Nombre</h3>
              <input
                type="text"
                defaultValue={selectedEmployee ? selectedEmployee.Nombre : ""}
                {...register("Nombre", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              />
              {errors.Nombre && (
                <p className="text-red-500">Nombre is required</p>
              )}
              <h3>Salario</h3>
              <input
                type="number"
                defaultValue={selectedEmployee ? selectedEmployee.Salario : ""}
                {...register("Salario", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              />
              {errors.Salario && (
                <p className="text-red-500">Salario is required</p>
              )}
              <button type="submit">Actualizar empleado</button>
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={closeViewModal}
        className="flex items-center justify-center"
        style={{
          content: {
            width: "80%",
            maxHeight: "80vh",
            margin: "auto",
          },
        }}
      >
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
                {employeeRequests.map((request) => (
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
            onClick={closeViewModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeesPage;
