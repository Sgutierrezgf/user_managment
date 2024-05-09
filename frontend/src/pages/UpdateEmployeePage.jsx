import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams, Navigate } from "react-router-dom";

function UpdateEmployeePage() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateEmployees, employees } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const employeeToUpdate = employees.find(
      (employee) => employee.id === parseInt(id)
    );
    setSelectedEmployee(employeeToUpdate);
  }, [id, employees]);

  const onSubmitUpdate = async (data) => {
    await updateEmployees(id, data);
    setIsUpdated(true);
  };

  const handleReturn = () => {
    navigate('/employees')
  }

  if (isUpdated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-green-200 max-w-md w-full p-10 rounded-md">
          <h1 className="text-2xl font-bold">
            ¡Empleado actualizado exitosamente!
          </h1>
          <Navigate to="/employees" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-6 lg:p-10 rounded-md">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Actualizar empleado: {selectedEmployee ? selectedEmployee.Nombre : ""}
        </h1>
        <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
          <h3>Fecha de ingreso</h3>
          <input
            type="date"
            defaultValue={selectedEmployee ? selectedEmployee.FechaIngreso : ""}
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
          {errors.Nombre && <p className="text-red-500">Nombre is required</p>}
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
          <div className="flex justify-between">
            <button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
              type="submit"
            >
              Actualizar Empleado
            </button>
            <button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
              type="button"
              onClick={handleReturn}
            >
              Regresar a Empleado
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default UpdateEmployeePage;
