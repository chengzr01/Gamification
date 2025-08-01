# sandbox_api_utils.py
import os
import time
from openai import AzureOpenAI

# Uncomment the following lines if you want to load environment variables from a .env file for running locally
# from dotenv import load_dotenv
# load_dotenv()

MAX_RETRIES = 3
RETRY_DELAY = 5

def get_client_sandbox():
    return AzureOpenAI(
        api_key=os.environ['AI_SANDBOX_KEY'],
        azure_endpoint=os.environ.get("SANDBOX_ENDPOINT", "https://api-ai-sandbox.princeton.edu/"),
        api_version=os.environ.get("SANDBOX_API_VERSION", "2024-02-01")
    )

def get_model_response_sandbox(client, model_name, max_tokens, messages, temperature=0):
    params = {
        "model": model_name,
        "messages": messages,
        "temperature": temperature,
        # "logprobs": True,
        # "top_logprobs": 1,
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
