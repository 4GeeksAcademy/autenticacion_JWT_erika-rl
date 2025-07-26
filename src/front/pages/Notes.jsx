import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Notes = () => {
	const { store } = useGlobalReducer();
	const navigate = useNavigate();

	const [notes, setNotes] = useState([]);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	// Redirige si no hay token
	useEffect(() => {
		if (!store.token) {
			navigate("/login");
		}
	}, [store.token]);

	// Cargar notas del usuario
	const fetchNotes = async () => {
		try {
			const response = await fetch(`${backendUrl}/api/notes`, {
				headers: {
					Authorization: `Bearer ${store.token}`,
				},
			});
			if (!response.ok) throw new Error("Error al obtener las notas");
			const data = await response.json();
			setNotes(data);
		} catch (error) {
			console.error("Error:", error.message);
		} finally {
			setLoading(false);
		}
	};

	// Crear nueva nota
	const createNote = async () => {
		try {
			const response = await fetch(`${backendUrl}/api/notes`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${store.token}`,
				},
				body: JSON.stringify({ title, content }),
			});
			if (!response.ok) throw new Error("Error al crear la nota");
			setTitle("");
			setContent("");
			fetchNotes(); // recargar notas
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	// Eliminar nota
	const deleteNote = async (id) => {
		try {
			const response = await fetch(`${backendUrl}/api/notes/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${store.token}`,
				},
			});
			if (!response.ok) throw new Error("Error al eliminar la nota");
			setNotes(notes.filter((note) => note.id !== id));
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	useEffect(() => {
		if (store.token) fetchNotes();
	}, [store.token]);

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Mis Notas</h2>

			<div className="card mb-4">
				<div className="card-body">
					<h5 className="card-title">Crear nueva nota</h5>
					<input
						type="text"
						className="form-control mb-2"
						placeholder="Título"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						className="form-control mb-2"
						placeholder="Contenido"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button className="btn btn-primary" onClick={createNote}>
						Guardar nota
					</button>
				</div>
			</div>

			{loading ? (
				<p>Cargando notas...</p>
			) : notes.length === 0 ? (
				<p>No hay notas aún.</p>
			) : (
				<div className="row">
					{notes.map((note) => (
						<div className="col-md-4 mb-3" key={note.id}>
							<div className="card h-100">
								<div className="card-body">
									<h5 className="card-title">{note.title}</h5>
									<p className="card-text">{note.content}</p>
								</div>
								<div className="card-footer text-end">
									<button
										className="btn btn-sm btn-danger"
										onClick={() => deleteNote(note.id)}
									>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};