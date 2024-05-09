import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    signin,
    isAuthenticated,
    // errors: { RegisterErrors },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/employees");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
  return (
    <div className="flex  items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-6 lg:p-10 rounded-md">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">Inicio de sesion</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="example@example.com"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Iniciar sesion
          </button>
          <p className="text-sm text-center text-gray-500">
            No tienes una cuenta?{" "}
            <Link to="/register" className="text-sky-500 font-medium">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
