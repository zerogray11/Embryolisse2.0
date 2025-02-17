from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import psycopg2
import os
from dotenv import load_dotenv
import base64

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
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}) # Enable CORS for all routes

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
        model="gpt-3.5-turbo",  # the new model name
        messages=[
            {"role": "system", "content": "You are Emma, the Embryolisse Consultant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()


# Function to recommend products based on user input
def recommend_products(context):
    skin_type = context['skin_type']
    concerns = context['concerns']
    age_group = context['age_group']
    category = context.get('category', None)

    # Query the database for matching products
    conn = get_db_connection()
    cur = conn.cursor()
    query = """
        SELECT title, category, benefits, ingredients, usage, images, urls
        FROM products
        WHERE
            (category ILIKE %s OR %s IS NULL) AND
            (skin_type ILIKE %s OR skin_type = 'all') AND
            (concerns ILIKE %s OR concerns = 'all') AND
            (age_group ILIKE %s OR age_group = 'all')
        LIMIT 3
    """
    params = (
        f"%{category}%",  # Match the specified category (or NULL if no category is provided)
        category,         # Optional: Pass NULL if no category is provided
        f"%{skin_type}%",  # Match skin type
        f"%{concerns}%",   # Match concerns
        f"%{age_group}%"   # Match age group
    )

    cur.execute(query, params)
    products = cur.fetchall()
    cur.close()
    conn.close()

    if not products:
        return "I couldn't find any products matching your criteria. Would you like to try again?"

    # Prepare the response with product details, images, and URLs
    response = {
        "message": "Based on your skin type and concerns, I recommend the following products:",
        "products": []
    }

    for product in products:
        # Convert bytea image data to base64
        image_base64 = base64.b64encode(product[5]).decode('utf-8') if product[5] else None

        product_details = {
            "title": product[0],
            "category": product[1],
            "benefits": product[2],
            "ingredients": product[3],
            "usage": product[4],
            "image": image_base64,  # Base64-encoded image
            "url": product[6]  # URL for the product
        }
        response["products"].append(product_details)

    return response

# Function to recommend a skincare routine
def recommend_routine(context):
    skin_type = context['skin_type']
    concerns = context['concerns']
    age_group = context['age_group']

    # Query the database for matching products
    conn = get_db_connection()
    cur = conn.cursor()
    categories = ["Cleanser", "Serum", "Moisturizer", "Eye Cream", "Mask"]
    response = {
        "message": "Here is a full skincare routine tailored for you:",
        "products": []
    }

    for category in categories:
        query = """
            SELECT title, category, benefits, ingredients, usage, images, urls
            FROM products
            WHERE
                category ILIKE %s AND
                (skin_type ILIKE %s OR skin_type = 'all') AND
                (concerns ILIKE %s OR concerns = 'all') AND
                (age_group ILIKE %s OR age_group = 'all')
            LIMIT 1
        """
        params = (
            f"%{category}%",  # Match the specified category
            f"%{skin_type}%",  # Match skin type
            f"%{concerns}%",   # Match concerns
            f"%{age_group}%"   # Match age group
        )

        cur.execute(query, params)
        product = cur.fetchone()

        if product:
            # Convert bytea image data to base64
            image_base64 = base64.b64encode(product[5]).decode('utf-8') if product[5] else None

            product_details = {
                "title": product[0],
                "category": product[1],
                "benefits": product[2],
                "ingredients": product[3],
                "usage": product[4],
                "image": image_base64,  # Base64-encoded image
                "url": product[6]  # URL for the product
            }
            response["products"].append(product_details)

    cur.close()
    conn.close()

    if not response["products"]:
        return "I couldn't find any products matching your criteria. Would you like to try again?"

    return response

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
    # Add CORS headers to the response
    response_headers = {
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    # Extract the latest user message from the request
    user_message = request.json.get('messages', [])[-1].get('content')

    # Initialize conversation context
    context = request.json.get('context', {})

    # Step 1: Introduction and offer help
    if not context.get('introduced'):
        response = ask_openai("Introduce yourself as Emma the Embryolisse Consultant and ask how you can help them. Offer two options: 1) Find a product 2) Build a skincare routine.")
        context['introduced'] = True
        return jsonify({"response": response, "context": context}), 200, response_headers

    # Step 2: Handle user's choice
    if not context.get('choice'):
        if "product" in user_message.lower():
            context['choice'] = 'product'
            response = "Sure! Let's find the perfect product for you. What category are you looking for? (e.g., Cleanser, Serum, Moisturizer, Eye Cream, Mask)"
            return jsonify({"response": response, "context": context}), 200, response_headers
        elif "routine" in user_message.lower():
            context['choice'] = 'routine'
            response = "Great! Let's build a personalized skincare routine for you. What is your skin type? (e.g., oily, dry, combination)"
            return jsonify({"response": response, "context": context}), 200, response_headers
        else:
            return jsonify({"response": "Sorry, I didn't understand that. Can you rephrase?", "context": context}), 200, response_headers

    # Step 3: Handle product recommendation
    if context['choice'] == 'product':
        if not context.get('category'):
            # Ask for the product category
            categories = ["Cleanser", "Serum", "Moisturizer", "Eye Cream", "Mask"]
            detected_category = None
            for category in categories:
                if category.lower() in user_message.lower():
                    detected_category = category
                    break

            if detected_category:
                context['category'] = detected_category
                response = "Got it! What is your skin type? (e.g., oily, dry, combination)"
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "Could you please tell me the category of the product you're looking for? (e.g., Cleanser, Serum, Moisturizer, Eye Cream, Mask)", "context": context}), 200, response_headers
        elif not context.get('skin_type'):
            # Check for skin type keywords
            skin_types = ["oily", "dry", "combination"]
            detected_skin_type = None
            for skin_type in skin_types:
                if skin_type in user_message.lower():
                    detected_skin_type = skin_type
                    break

            if detected_skin_type:
                context['skin_type'] = detected_skin_type
                response = "What are your main skincare concerns? (e.g., acne, dryness, wrinkles)"
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "Could you please tell me your skin type? (e.g., oily, dry, combination)", "context": context}), 200, response_headers
        elif not context.get('concerns'):
            # Check for concerns keywords
            concerns = ["acne", "dryness", "wrinkles", "uneven skin tone"]
            detected_concern = None
            for concern in concerns:
                if concern in user_message.lower():
                    detected_concern = concern
                    break

            if detected_concern:
                context['concerns'] = detected_concern
                response = "May I ask your age group? (e.g., 20s, 30s, 40s, 50s+)"
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "What are your main skincare concerns? (e.g., acne, dryness, wrinkles)", "context": context}), 200, response_headers
        elif not context.get('age_group'):
            # Check for age group keywords
            age_groups = ["20", "30", "40", "50"]
            detected_age_group = None
            for age_group in age_groups:
                if age_group in user_message.lower():
                    detected_age_group = age_group
                    break

            if detected_age_group:
                context['age_group'] = detected_age_group
                # Step 4: Recommend top 3 products in the specified category
                response = recommend_products(context)
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "May I ask your age group? (e.g., 20s, 30s, 40s, 50s+)", "context": context}), 200, response_headers

    # Step 5: Handle skincare routine recommendation
    elif context['choice'] == 'routine':
        if not context.get('skin_type'):
            # Check for skin type keywords
            skin_types = ["oily", "dry", "combination"]
            detected_skin_type = None
            for skin_type in skin_types:
                if skin_type in user_message.lower():
                    detected_skin_type = skin_type
                    break

            if detected_skin_type:
                context['skin_type'] = detected_skin_type
                response = "What are your main skincare concerns? (e.g., acne, dryness, wrinkles)"
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "Could you please tell me your skin type? (e.g., oily, dry, combination)", "context": context}), 200, response_headers
        elif not context.get('concerns'):
            # Check for concerns keywords
            concerns = ["acne", "dryness", "wrinkles", "uneven skin tone"]
            detected_concern = None
            for concern in concerns:
                if concern in user_message.lower():
                    detected_concern = concern
                    break

            if detected_concern:
                context['concerns'] = detected_concern
                response = "May I ask your age group? (e.g., 20s, 30s, 40s, 50s+)"
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "What are your main skincare concerns? (e.g., acne, dryness, wrinkles)", "context": context}), 200, response_headers
        elif not context.get('age_group'):
            # Check for age group keywords
            age_groups = ["20", "30", "40", "50"]
            detected_age_group = None
            for age_group in age_groups:
                if age_group in user_message.lower():
                    detected_age_group = age_group
                    break

            if detected_age_group:
                context['age_group'] = detected_age_group
                # Recommend routine
                response = recommend_routine(context)
                return jsonify({"response": response, "context": context}), 200, response_headers
            else:
                return jsonify({"response": "May I ask your age group? (e.g., 20s, 30s, 40s, 50s+)", "context": context}), 200, response_headers

    return jsonify({"response": "Sorry, I couldn't understand that. Can you rephrase?", "context": context}), 200, response_headers

if __name__ == "__main__":
    app.run(debug=True)