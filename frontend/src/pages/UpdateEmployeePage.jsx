import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Navigate, useParams } from "react-router-dom";

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
    <div className="flex h-[calc(100hv-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">
          Actualizar empleado: {selectedEmployee ? selectedEmployee.Nombre : ""}
        </h1>
        <form onSubmit={handleSubmit(onSubmitUpdate)}>
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
          <button type="submit">Actualizar Empleado</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployeePage;