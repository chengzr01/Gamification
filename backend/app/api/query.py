from flask import Blueprint, request, jsonify

bp = Blueprint('api', __name__)

@bp.route('/query', methods=['POST'])
def query():
    print("query")
    data = request.json
    # prompt = data.get('prompt', '')
    response = "Hello, world!"
    return jsonify({'response': response})
