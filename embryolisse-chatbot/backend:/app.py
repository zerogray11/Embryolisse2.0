from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import psycopg2
from flask_cors import CORS
import numpy as np
import faiss
import json
import requests

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["http://localhost:5173"])

# Path to the embeddings and metadata files
EMBEDDINGS_FILE = "/Users/macbookpro/Desktop/Embryolisse2.0/embryolisse-chatbot/backend:/embeddings.npy"
METADATA_FILE = "/Users/macbookpro/Desktop/Embryolisse2.0/embryolisse-chatbot/backend:/products_with_metadata.json"

# Load embeddings and product metadata
embeddings = np.load(EMBEDDINGS_FILE)
with open(METADATA_FILE, "r") as file:
    products = json.load(file)

# Initialize FAISS index
d = embeddings.shape[1]
index = faiss.IndexFlatL2(d)
index.add(embeddings)

# Database connection function
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD')
        )
        return conn
    except Exception as e:
        print("Database connection error:", e)
        return None

# Generate embedding for a given text (using OpenAI API)
def get_embedding(text):
    """Send text to OpenAI API and return the embedding."""
    headers = {
        "Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY')}",
        "Content-Type": "application/json"
    }
    data = {
        "input": text,
        "model": "text-embedding-ada-002"
    }
    try:
        response = requests.post("https://api.openai.com/v1/embeddings", json=data, headers=headers)
        response.raise_for_status()
        return response.json()["data"][0]["embedding"]
    except requests.exceptions.RequestException as e:
        print(f"API Request Failed: {e}")
        return None

# Function to find the most similar product using FAISS
def get_most_similar_product(user_input_embedding, category=None):
    try:
        user_input_embedding = np.array(user_input_embedding).reshape(1, -1).astype('float32')
        _, indices = index.search(user_input_embedding, 1)
        most_similar_idx = indices[0][0]
        if category:
            filtered_products = [p for p in products if p["category"] == category]
            if filtered_products:
                return filtered_products[0]
        return products[most_similar_idx]
    except Exception as e:
        print(f"Error in get_most_similar_product: {e}")
        return None

# Function to suggest a full skincare routine
def suggest_skincare_routine():
    categories = ["cleanser", "moisturizer", "cream", "serum", "eye cream"]
    routine = {category: next((p for p in products if p["category"] == category), None) for category in categories}
    return routine

# Root endpoint
@app.route('/')
def home():
    return "Welcome to the Embryolisse Skincare Chatbot API!"

# Chatbot endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.json
    user_input = data.get('messages', [])
    context = data.get('context', {})

    if not user_input:
        response = {
            "message": "Hello! I'm Emma, your Embryolisse skincare consultant. How can I assist you today? Let's start by learning about your skin type—do you have dry, oily, or sensitive skin?",
            "context": {"introduced": True}
        }
        return jsonify({"response": response})

    last_message = user_input[-1]['content'].lower()

    if "skin_type" not in context:
        context["skin_type"] = last_message
        response = {
            "message": "What are your main skincare concerns? Are you dealing with acne, dryness, wrinkles, or something else?",
            "context": context
        }
        return jsonify({"response": response})

    if "skin_concern" not in context:
        context["skin_concern"] = last_message
        response = {
            "message": "May I ask your age group? This helps me recommend the best products for you.",
            "context": context
        }
        return jsonify({"response": response})

    if "age_group" not in context:
        context["age_group"] = last_message
    
    if "routine" in last_message:
        routine = suggest_skincare_routine()
        response = {
            "message": "Here is a full skincare routine tailored for you:",
            "routine": routine,
            "context": context
        }
        return jsonify({"response": response})
    else:
        user_input_embedding = get_embedding(last_message)
        if user_input_embedding is None:
            return jsonify({"error": "Failed to generate embedding for user input"}), 500

        most_similar_product = get_most_similar_product(user_input_embedding)
        if most_similar_product:
            response = {
                "message": f"Based on your skin type and concern, I recommend the {most_similar_product['title']}. {most_similar_product['seo_description']}. Would you like me to suggest a full skincare routine as well?",
                "product_details": most_similar_product,
                "context": {"product_recommended": True, **context}
            }
        else:
            response = {"message": "I'm sorry, I couldn't find a product recommendation. Would you like me to suggest a skincare routine instead?", "context": context}
    
    return jsonify({"response": response})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5001, debug=True)
