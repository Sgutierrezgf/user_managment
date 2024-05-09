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
    const { updateRequest, requests } = useAuth();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const requestToUpdate = requests.find(
            (req) => req.id === parseInt(id)
        );
        setSelectedRequest(requestToUpdate);
    }, [id, requests]);

    const onSubmitUpdate = async (data) => {
        await updateRequest(id, data);
        setIsUpdated(true);
    };

    const handleReturn = () => {
        navigate(`/requests-employee/${id}`)
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
                    Actualizar solicitud: {selectedRequest ? selectedRequest.employee.Nombre : ""}
                </h1>
                <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
                    <h3>Código</h3>
                    <input
                        type="text"
                        defaultValue={selectedRequest ? selectedRequest.codigo : ""}
                        {...register("codigo", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.codigo && (
                        <p className="text-red-500">Código is required</p>
                    )}
                    <h3>Descripción</h3>
                    <input
                        type="text"
                        defaultValue={selectedRequest ? selectedRequest.descripcion : ""}
                        {...register("descripcion", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.descripcion && <p className="text-red-500">Descripción is required</p>}
                    <h3>Resumen</h3>
                    <input
                        type="text"
                        defaultValue={selectedRequest ? selectedRequest.resumen : ""}
                        {...register("resumen", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.resumen && (
                        <p className="text-red-500">Resumen is required</p>
                    )}
                    <div className="flex justify-between">
                        <button
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
                            type="submit"
                        >
                            Actualizar Solicitud
                        </button>
                        <button
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
                            type="button"
                            onClick={handleReturn}
                        >
                            Regresar a Solicitudes
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default UpdateEmployeePage;
