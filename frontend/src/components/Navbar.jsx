import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ButtonLink from "./ui/ButtonLink";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className=" my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Informacion empleados</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            {/* <li>Welcome {employee.Nombre}</li> */}
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
