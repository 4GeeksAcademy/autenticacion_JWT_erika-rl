"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.models import Note
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(email=data['email'], password=data['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado exitosamente"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200

@api.route('/notes', methods=['POST'])
@jwt_required()
def create_note():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_note = Note(
        title=data.get('title'),
        content=data.get('content'),
        user_id=user_id
    )
    db.session.add(new_note)
    db.session.commit()

    return jsonify(new_note.serialize()), 201

# Obtener todas las notas del usuario autenticado
@api.route('/notes', methods=['GET'])
@jwt_required()
def get_notes():
    print("estoy en notes")
    user_id = get_jwt_identity()
    notes = Note.query.filter_by(user_id=user_id).all()
    return jsonify([note.serialize() for note in notes]), 200


# Eliminar una nota específica por ID
@api.route('/notes/<int:note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    user_id = get_jwt_identity()
    note = Note.query.filter_by(id=note_id, user_id=user_id).first()

    if not note:
        return jsonify({"error": "Nota no encontrada"}), 404

    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Nota eliminada"}), 200
