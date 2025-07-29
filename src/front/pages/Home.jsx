import React from "react";
import { Link } from "react-router-dom";


export const Home = () => {
	return (
		<div className="container text-center mt-5">
			<h1 className="display-4 mb-3">Bienvenido a Notes App 📝</h1>
			
			<p className="lead mt-5">
				Una aplicación simple para guardar tus notas personales.
			</p>
			<div className="d-flex justify-content-center gap-3 mt-5">
				<Link to="/login" className="btn btn-primary btn-lg ">
					Iniciar sesión
				</Link>
				<Link to="/register" className="btn btn-outline-secondary btn-lg">
					Registrarse
				</Link>
			</div>
		</div>
	);
};