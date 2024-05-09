import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";

function AddEmployee() {
  const { addNewEmployee } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAdd = handleSubmit(async (values) => {
    setLoading(true);
    await addNewEmployee(values);
    setLoading(false);
    setModalIsOpen(true);
  });

  const handleGoToEmployees = () => {
    navigate("/employees");
  };

  const handleReturn = () => {
    navigate("/employees");
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Nuevo empleado</h1>
        <form onSubmit={onSubmitAdd}>
          <h3>Fecha de ingreso</h3>
          <input
            type="date"
            {...register("FechaIngreso", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.FechaIngreso && (
            <p className="text-red-500">Fecha de ingreso es requerida</p>
          )}
          <h3>Nombre</h3>
          <input
            type="text"
            {...register("Nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.Nombre && <p className="text-red-500">Nombre es requerido</p>}
          <h3>Salario</h3>
          <input
            type="number"
            {...register("Salario", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.Salario && (
            <p className="text-red-500">Salario es requerido</p>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              {loading ? (
                <div
                  className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-warning opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Agregar empleado"
              )}
            </button>
            <button
              type="button"
              onClick={handleReturn}
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Regresar a empleados
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        className="flex items-center justify-center"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
          },
          content: {
            width: "90%",
            maxWidth: "400px", // Ancho máximo del contenido del modal
            maxHeight: "90vh", // Altura máxima del contenido del modal
            margin: "auto",
          },
        }}
      >
        <div className="bg-zinc-800 w-full p-10 rounded-md text-center">
          <h1 className="text-2xl font-bold mb-4">Información del empleado</h1>
          <h2>Empleado agregado exitosamente</h2>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              onClick={() => setModalIsOpen(false)}
            >
              Agregar uno nuevo
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              onClick={handleGoToEmployees}
            >
              Volver a empleados
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddEmployee;
