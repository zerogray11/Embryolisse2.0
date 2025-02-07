from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import psycopg2
from openai import OpenAI
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["http://localhost:5174"])  # Allow requests from your React frontend

# Initialize the DeepSeek client
client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),  # Load your DeepSeek API key
    base_url="https://api.deepseek.com"  # Set the base URL to DeepSeek's API endpoint
)
# Helper function to extract information from user input
def extract_info(text, options):
    for option in options:
        if option in text:
            return option
    return None
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

# Root endpoint
@app.route('/')
def home():
    return "Welcome to the Skincare Chatbot API!"

# Chatbot endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    # Ensure the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.json
    user_input = data.get('messages', [])

    # Debugging: Log the received user input
    print("Received user input:", user_input)

    if not user_input:
        return jsonify({"error": "No messages provided"}), 400

    # Extract the last user message
    last_message = user_input[-1]['content'].lower()

    # Logic for asking clarifying questions
    if "skin type" not in last_message and "skin condition" not in last_message and "age" not in last_message:
        # Ask clarifying questions if the user hasn't provided enough information
        if "hi" in last_message or "hello" in last_message:
            response = "Hello! I can help with skincare recommendations. What's your skin type? (e.g., oily, dry, combination, sensitive)"
        elif "skin type" not in last_message:
            response = "What's your skin type? (e.g., oily, dry, combination, sensitive)"
        elif "skin condition" not in last_message:
            response = "What are your skin concerns? (e.g., acne, aging, hydration, exfoliation)"
        elif "age" not in last_message:
            response = "What's your age range? (e.g., 16-25, 26-35, 36+)"
    else:
        # Extract user information from the conversation
        skin_type = None
        skin_condition = None
        age_range = None

        for message in user_input:
            content = message['content'].lower()
            if "skin type" in content:
                skin_type = extract_info(content, ["oily", "dry", "combination", "sensitive", "all"])
            if "skin condition" in content or "skin concerns" in content:
                skin_condition = extract_info(content, ["acne", "aging", "hydration", "exfoliation"])
            if "age" in content:
                age_range = extract_info(content, ["16-25", "26-35", "36+", "all"])

        # Debugging: Log extracted user information
        print("Extracted user info - Skin Type:", skin_type, "Skin Condition:", skin_condition, "Age Range:", age_range)

        # Check if all required information is available
        if not skin_type or not skin_condition or not age_range:
            response = "I need more info to help. Please share your skin type, concerns, and age range."
        else:
            # Fetch product recommendations from the database
            conn = get_db_connection()
            if not conn:
                return jsonify({"error": "Database connection failed"}), 500

            cur = conn.cursor()
            try:
                cur.execute(
                    "SELECT name, description, image_url, product_url FROM products WHERE skin_type = %s AND skin_condition = %s AND age_group = %s",
                    (skin_type, skin_condition, age_range)
                )
                products = cur.fetchall()
                if products:
                    product_list = [{"name": p[0], "description": p[1], "image_url": p[2], "product_url": p[3]} for p in products]
                    response = {"message": "Here are my recommendations:", "products": product_list}
                else:
                    response = "Sorry, I couldn't find any products matching your needs."
            except Exception as e:
                print("Database query error:", e)
                return jsonify({"error": "Database query failed"}), 500
            finally:
                cur.close()
                conn.close()

    # If no product recommendations, call DeepSeek API for conversational response
    if isinstance(response, str):  # If response is a string, it means we're querying DeepSeek
        try:
            # Make the call to DeepSeek API
            api_response = client.chat.completions.create(
                model="deepseek-chat",
                messages=user_input,
                stream=False
            )
            return jsonify({"response": api_response.choices[0].message.content})
        except Exception as e:
            print('Error calling DeepSeek API:', e)
            return jsonify({'error': 'Failed to get response from DeepSeek API'}), 500

    return jsonify({"response": response})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5001, debug=True)