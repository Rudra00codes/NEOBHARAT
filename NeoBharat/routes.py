from flask import Blueprint, request, jsonify
from services.user_service import authenticate_user
from ai.diagnostic_model import get_diagnosis
from services.abha_service import verify_abha
from services.bhashini_service import translate_text

api_bp = Blueprint('api', __name__)

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if authenticate_user(username, password):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@api_bp.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    symptoms = data.get('symptoms')
    language = data.get('language', 'en')
    
    # Translate symptoms if not in English
    if language != 'en':
        symptoms = translate_text(symptoms, source_lang=language, target_lang='en')
    
    diagnosis = get_diagnosis(symptoms)
    
    # Translate diagnosis back to original language
    if language != 'en':
        diagnosis = translate_text(diagnosis, source_lang='en', target_lang=language)
    
    return jsonify({"diagnosis": diagnosis}), 200

@api_bp.route('/verify_abha', methods=['POST'])
def verify_abha_route():
    data = request.json
    abha_id = data.get('abha_id')
    if verify_abha(abha_id):
        return jsonify({"message": "ABHA verified"}), 200
    return jsonify({"message": "Invalid ABHA ID"}), 400

# Add more routes for teleconsultation, health information library, etc.

