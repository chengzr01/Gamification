from flask import Blueprint, request, jsonify
from app.services.openrouter import get_client_openrouter, get_model_response_openrouter

bp = Blueprint('api', __name__)

@bp.route('/query', methods=['POST'])
def query():
    data = request.json
    prompt = data.get('prompt', '')
    model = data.get('model', 'deepseek/deepseek-r1:free')
    max_tokens = data.get('max_tokens', 1000)
    temperature = data.get('temperature', 0)

    # Create messages array with user prompt
    messages = [{"role": "user", "content": prompt}]

    # Get OpenRouter client
    client = get_client_openrouter()

    # Get response from model
    response = get_model_response_openrouter(
        client=client,
        model_name=model,
        max_tokens=max_tokens,
        messages=messages,
        temperature=temperature
    )
    
    if response is None:
        return jsonify({'error': 'Failed to get response from model'}), 500
    else:
        return jsonify({'response': response})
