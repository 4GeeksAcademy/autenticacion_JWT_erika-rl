import { Link, useNavigate, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { dispatch } = useGlobalReducer();

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch({ type: "LOGOUT" });
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
    		<div className="container d-flex justify-content-between align-items-center">
				{location.pathname === "/notes" && (
					<div className="ms-auto">
        				<button className="btn btn-danger" onClick={handleLogout}>
          					Logout
        				</button>
					</div>
				)}
    		</div>
  		</nav>
	);
	};