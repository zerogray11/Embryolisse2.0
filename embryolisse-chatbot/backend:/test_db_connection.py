from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Set up PostgreSQL connection
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT", "5432")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Connect to PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    return conn

# Function to call OpenAI API for chat response
def ask_openai(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Use the new model name
        messages=[
            {"role": "system", "content": "You are Emma, the Embryolisse Consultant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

# Route for the root URL
@app.route('/')
def home():
    return "Welcome to the Embryolisse Chatbot!"

# Route to serve the favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

# Route to handle conversation and chat
@app.route("/api/chat", methods=["POST"])
def chat():
    # Extract the latest user message from the request
    user_message = request.json.get('messages', [])[-1].get('content')

    # Initialize conversation context
    context = request.json.get('context', {})

    # Step 1: Introduction and offer help
    if not context.get('introduced'):
        response = ask_openai("Introduce yourself as Emma the Embryolisse Consultant and ask how you can help them. Offer two options: 1) Find a product 2) Build a skincare routine.")
        context['introduced'] = True
        return jsonify({"response": response, "context": context})

    # Step 2: Handle user's choice
    if not context.get('choice'):
        if "product" in user_message.lower():
            context['choice'] = 'product'
            response = ask_openai("Ask the user 3 questions: 1) Skin type (e.g., oily, dry) 2) Main skincare concerns (e.g., acne, dryness, wrinkles) 3) Age group.")
            return jsonify({"response": response, "context": context})
        elif "routine" in user_message.lower():
            context['choice'] = 'routine'
            response = ask_openai("Ask the user 3 questions: 1) Skin type (e.g., oily, dry) 2) Main skincare concerns (e.g., acne, dryness, wrinkles) 3) Age group.")
            return jsonify({"response": response, "context": context})
        else:
            return jsonify({"response": "Sorry, I didn't understand that. Can you rephrase?", "context": context})

    # Step 3: Collect user's skin type, concerns, and age group
    if not context.get('skin_type'):
        if "skin type" in user_message.lower():
            context['skin_type'] = user_message
            response = "What are your main skincare concerns? Are you dealing with acne, dryness, wrinkles, or something else?"
            return jsonify({"response": response, "context": context})
    elif not context.get('concerns'):
        if "concerns" in user_message.lower():
            context['concerns'] = user_message
            response = "May I ask your age group? This helps me recommend the best products for you."
            return jsonify({"response": response, "context": context})
    elif not context.get('age_group'):
        if "age group" in user_message.lower():
            context['age_group'] = user_message
            # Step 4: Recommend products or routine based on user input
            if context['choice'] == 'product':
                response = recommend_products(context)
            else:
                response = recommend_routine(context)
            return jsonify({"response": response, "context": context})

    # Step 5: Handle follow-up questions
    if "more help" in user_message.lower():
        response = "How else can I assist you today?"
        return jsonify({"response": response, "context": context})
    elif "thank you" in user_message.lower() or "no" in user_message.lower():
        response = "Thank you for shopping at Embryolisse! Have a great day!"
        return jsonify({"response": response, "context": {}})

    # Fallback response
    return jsonify({"response": "Sorry, I didn't understand that. Can you rephrase?", "context": context})

# Function to recommend products based on user input
def recommend_products(context):
    skin_type = context['skin_type']
    concerns = context['concerns']
    age_group = context['age_group']

    # Query the database for matching products
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT title, category, benefits, ingredients, usage, eco_conception 
        FROM products 
        WHERE category ILIKE %s OR category ILIKE %s OR category ILIKE %s
    """, (f"%{skin_type}%", f"%{concerns}%", f"%{age_group}%"))
    products = cur.fetchall()
    cur.close()
    conn.close()

    if not products:
        return "I couldn't find any products matching your criteria. Would you like to try again?"

    response = "Based on your skin type and concerns, I recommend the following products:\n"
    for product in products:
        response += f"\n- **{product[0]}** ({product[1]}):\n"
        response += f"  **Benefits**: {', '.join(product[2])}\n"
        response += f"  **Ingredients**: {', '.join(product[3])}\n"
        response += f"  **Usage**: {product[4]['morning']}\n"
        response += f"  **Eco-Friendly**: {product[5]['packaging']}\n"

    response += "\nWould you like me to suggest a full skincare routine as well?"
    return response

# Function to recommend a skincare routine
def recommend_routine(context):
    skin_type = context['skin_type']
    concerns = context['concerns']
    age_group = context['age_group']

    # Query the database for matching products
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT title, category, benefits, ingredients, usage 
        FROM products 
        WHERE category ILIKE %s OR category ILIKE %s OR category ILIKE %s
    """, (f"%{skin_type}%", f"%{concerns}%", f"%{age_group}%"))
    products = cur.fetchall()
    cur.close()
    conn.close()

    if not products:
        return "I couldn't find any products matching your criteria. Would you like to try again?"

    response = "Here is a full skincare routine tailored for you:\n"
    categories = ["Cleanser", "Serum", "Moisturizer", "Eye Cream", "Mask"]
    for category in categories:
        for product in products:
            if category.lower() in product[1].lower():
                response += f"\n- **{category}**: {product[0]}\n"
                response += f"  **Benefits**: {', '.join(product[2])}\n"
                response += f"  **Usage**: {product[4]['morning']}\n"
                break

    response += "\nWould you like more help or information about any of these products?"
    return response

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)