from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import psycopg2
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["http://localhost:5173"])  # Allow requests from your React frontend

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

# Knowledge base for general questions
def handle_general_question(question):
    knowledge_base = {
        "what is embryolisse": "Embryolisse is a French skincare brand known for its high-quality, dermatologist-tested products.",
        "what products do you sell": "We sell a wide range of skincare products, including moisturizers, serums, masks, and more. You can explore our products at https://us.embryolisse.com/.",
        "where can i buy your products": "You can buy our products online at our official website (https://us.embryolisse.com/) or at authorized retailers.",
        "do you have products for oily skin": "Yes, we have products specifically formulated for oily skin, such as our Mattifying Moisturizer.",
        "do you have products for dry skin": "Yes, we have products like the Lait-Crème Concentré that are perfect for dry skin.",
    }
    question = question.lower()
    return knowledge_base.get(question, "I'm sorry, I don't have information about that. Can you please ask something else?")

# Function to fetch product recommendations
def fetch_recommendations(skin_type, skin_condition, age_bracket, additional_filters=None):
    conditions = []
    if skin_condition == "hydration":
        conditions.append("for_winter = TRUE")
    if skin_condition == "anti-aging":
        conditions.append("anti_age = TRUE")
    if skin_condition == "sun protection":
        conditions.append("for_sun = TRUE")
    if skin_condition == "winter care":
        conditions.append("for_winter = TRUE")

    # Apply additional filters if provided
    if additional_filters:
        conditions.append(additional_filters)

    # Build the SQL query based on conditions
    query = "SELECT name, description, image_url FROM products"
    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    # Fetch product recommendations from the database
    conn = get_db_connection()
    if not conn:
        return None

    cur = conn.cursor()
    try:
        cur.execute(query)
        products = cur.fetchall()
        if products:
            return [{"name": p[0], "description": p[1], "image_url": p[2]} for p in products]
        else:
            return None
    except Exception as e:
        print("Database query error:", e)
        return None
    finally:
        cur.close()
        conn.close()

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

    if not user_input:
        return jsonify({"error": "No messages provided"}), 400

    # Extract the last user message
    last_message = user_input[-1]['content'].lower()

    # Initialize response
    response = None

    # Check if this is the first message in the conversation
    if len(user_input) == 1 and ("hi" in last_message or "hello" in last_message):
        response = "Hello! I'm your Embryolisse skincare consultant. How can I help you today?"
    else:
        # Check if the user is asking a general question
        general_questions = ["what is embryolisse", "what products do you sell", "where can i buy your products", "do you have products for oily skin", "do you have products for dry skin"]
        if any(q in last_message for q in general_questions):
            response = handle_general_question(last_message)
        else:
            # Check if the user is asking for something specific (e.g., "I want a moisturizer for my dry skin")
            additional_filters = None
            if "moisturizer" in last_message:
                additional_filters = "name ILIKE '%moisturizer%'"
            elif "cleanser" in last_message:
                additional_filters = "name ILIKE '%cleanser%'"
            elif "serum" in last_message:
                additional_filters = "name ILIKE '%serum%'"

            # Fetch product recommendations
            products = fetch_recommendations(None, None, None, additional_filters)
            if products:
                response = {"message": "Here are my recommendations for you:", "products": products}
            else:
                response = "Sorry, I couldn't find any products matching your needs."

    # If no product recommendations, provide a generic response
    if isinstance(response, str):
        response = {"message": response}

    return jsonify({"response": response})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5001, debug=True)