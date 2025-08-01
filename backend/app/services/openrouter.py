# openrouter_api_utils.py
import os
import time
from openai import OpenAI

# Uncomment the following lines if you want to load environment variables from a .env file for running locally
# from dotenv import load_dotenv
# load_dotenv()

MAX_RETRIES = 3
RETRY_DELAY = 5

def get_client_openrouter():
    return OpenAI(
        api_key=os.environ['OPENROUTER_API_KEY'],
        base_url="https://openrouter.ai/api/v1"
    )

def get_model_response_openrouter(client, model_name, max_tokens, messages, temperature=0):
    params = {
        "model": model_name,
        "messages": messages,
        "temperature": temperature,
        "n": 1,
        "max_tokens": max_tokens,
    }
    
    for attempt in range(MAX_RETRIES):
        try:
            completion = client.chat.completions.create(**params)
            return completion.choices[0].message.content.strip()
        except Exception as e:
            print(f"Retry {attempt+1}/{MAX_RETRIES} failed: {e}")
            time.sleep(RETRY_DELAY)
    return None

# Example usage for DeepSeek R1
def get_deepseek_r1_response(client, max_tokens, messages, temperature=0):
    """
    Convenience function to call DeepSeek R1 specifically
    """
    return get_model_response_openrouter(
        client, 
        "deepseek/deepseek-r1:free", 
        max_tokens, 
        messages, 
        temperature
    ) 