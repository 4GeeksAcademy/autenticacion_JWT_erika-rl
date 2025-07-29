import React from "react";
import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const RequireAuth = ({ children }) => {
	const { store } = useGlobalReducer();

	// Si no hay token, redirige al login
	if (!store.auth.token) {
		return <Navigate to="/login" />;
	}

	// Si hay token, muestra el contenido protegido
	return children;
};