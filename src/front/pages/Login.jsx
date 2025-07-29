import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const { dispatch } = useGlobalReducer();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.msg || "Credenciales inválidas");
			}

			localStorage.setItem("token", data.access_token); // Guarda el token
			dispatch({ type: "SET_TOKEN", payload: data.access_token }); // Actualiza el contexto
			navigate("/notes"); // Redirige a notas

		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="container mt-5" style={{ maxWidth: "400px" }}>
			<h2 className="mb-4">Iniciar sesión</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label>Contraseña</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div className="alert alert-danger">{error}</div>}
				<button type="submit" className="btn btn-success w-100">
					Entrar
				</button>
				<div className="mt-3 text-center">
					¿Todavía no tienes cuenta? <Link to="/register">Regístrate</Link>
				</div>
			</form>
		</div>
	);
};