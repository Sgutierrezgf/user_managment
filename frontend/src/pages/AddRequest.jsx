import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";

function AddRequest() {
  const { addNewRequest } = useAuth(); // Obtener el usuario actual desde el contexto de autenticación
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id: employeeId } = useParams(); // Obtener el id del empleado de los parámetros de la URL

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
    await addNewRequest({ ...values, employeeId }); // Enviar el id del empleado junto con los otros datos del formulario
    setLoading(false);
    setModalIsOpen(true);
  });

  const handleGoToEmployees = () => {
    navigate(`/employee/requests-employee/${employeeId}`);
  };

  const handleReturn = () => {
    navigate(`/employees`);
  };

  return (
    <div className="flex h-[calc(100hv-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Nueva solicitud</h1>
        <form onSubmit={onSubmitAdd}>
          <h3>Empleado ID: {employeeId}</h3> {/* Mostrar el ID del empleado */}
          <h3>Codigo</h3>
          <input
            type="text"
            {...register("codigo", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.codigo && <p className="text-red-500">codigo is required</p>}
          <h3>Descripcion</h3>
          <input
            type="text"
            {...register("descripcion", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.descripcion && (
            <p className="text-red-500">descripcion is required</p>
          )}
          <h3>resumen</h3>
          <input
            type="text"
            {...register("resumen", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.resumen && (
            <p className="text-red-500">resumen is required</p>
          )}
          <div className="flex">
            <button type="submit" disabled={loading} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
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
                "Agregar otra solicitud"
              )}
            </button>
            <button onClick={handleReturn} type="submit" disabled={loading} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
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
                "Regresar a empleados"
              )}
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
            width: "50%",
            maxHeight: "50vh",
            margin: "auto",
          },
        }}
      >
        <div className="bg-zinc-800 w-full p-10 rounded-md text-center">
          <h1 className="text-2xl font-bold mb-4">Información del empleado</h1>
          <h2>Solicitud agregada exitosamente</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2"
            onClick={() => setModalIsOpen(false)}
          >
            Agregar uno nuevo
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-2"
            onClick={handleGoToEmployees}
          >
            Volver a solicitudes
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AddRequest;
