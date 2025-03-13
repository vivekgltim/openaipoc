import sys
import openai
from openai import AzureOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up your OpenAI API key
api_key = "6f851b2fb9144e2da09c5abc24655105"
api_base = "https://rcg-openai1.openai.azure.com/"
api_version = "2024-05-01-preview"
client = AzureOpenAI(  
    azure_endpoint=api_base,  
    api_key=api_key,  
    api_version="2024-05-01-preview",
)

def send_prompt(prompt):
    try:
        response = client.chat.completions.create(
            model="rcg-openai-gpt4",  # Use a supported model
            messages=[
                #{"role": "system", "content": prompt},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800,
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )
        content = response.choices[0].message.content.strip()
        return content
    except Exception as e:
        print('Error in send_prompt function:', e)
        raise e

@app.route('/api/prompts', methods=['POST'])
def api_prompt():
    data = request.json
    prompt = data.get('prompt', '')
    response = send_prompt(prompt)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)