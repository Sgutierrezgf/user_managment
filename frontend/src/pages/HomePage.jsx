import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 lg:p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
