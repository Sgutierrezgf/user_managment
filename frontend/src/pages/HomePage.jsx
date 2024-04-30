import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido a la página de empleados
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="m-2">
            <LoginPage />
          </div>
          <div className="m-2">
            <RegisterPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
