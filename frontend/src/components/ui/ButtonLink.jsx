/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ButtonLink({ to, children }) {
  return (
    <Link to={to} className="bg-indigo-500 px-4 py-1 rounded-md">
      {children}
    </Link>
  );
}

export default ButtonLink;
