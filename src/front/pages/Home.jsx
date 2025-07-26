import React from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {
	return (
		<div className="container text-center mt-5">
			<h1 className="display-4 mb-3">Bienvenido a Notes App 📝</h1>
			<img
				src={rigoImageUrl}
				className="img-fluid rounded-circle mb-3"
				alt="Rigo Baby"
				style={{ width: "150px" }}
			/>
			<p className="lead mb-4">
				Una aplicación simple para guardar tus notas personales. ¡Accede desde cualquier lugar!
			</p>
			<div className="d-flex justify-content-center gap-3">
				<Link to="/login" className="btn btn-primary btn-lg">
					Iniciar sesión
				</Link>
				<Link to="/register" className="btn btn-outline-secondary btn-lg">
					Registrarse
				</Link>
			</div>
		</div>
	);
};