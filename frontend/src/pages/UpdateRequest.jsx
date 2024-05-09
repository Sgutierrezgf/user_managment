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
        <div className="flex h-[calc(100hv-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-2xl font-bold">
                    Actualizar empleado: {selectedRequest ? selectedRequest.employee.Nombre : ""}
                </h1>
                <form onSubmit={handleSubmit(onSubmitUpdate)}>
                    <h3>Codigo</h3>
                    <input
                        type="text"
                        defaultValue={selectedRequest ? selectedRequest.codigo : ""}
                        {...register("codigo", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.codigo && (
                        <p className="text-red-500">codigo Ingreso is required</p>
                    )}
                    <h3>Descripcion</h3>
                    <input
                        type="text"
                        defaultValue={selectedRequest ? selectedRequest.descripcion : ""}
                        {...register("descripcion", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.Nombre && <p className="text-red-500">descripcion is required</p>}
                    <h3>Resumen</h3>
                    <input
                        type="text"
                        defaultValue={selectedRequest ? selectedRequest.resumen : ""}
                        {...register("resumen", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.Salario && (
                        <p className="text-red-500">resumen is required</p>
                    )}
                    <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" type="submit">Actualizar solicutd</button>
                    <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" type="submit" onClick={handleReturn}>Regresar a solicitudes</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployeePage;
