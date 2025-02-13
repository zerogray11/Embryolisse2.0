import requests
import pandas as pd
import json
import os
import numpy as np
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set OpenAI API key and endpoint
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")  # Make sure to set this in your .env file
OPENAI_URL = "https://api.openai.com/v1/embeddings"

def get_embedding(text):
    """Send text to OpenAI API and return the embedding."""
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "input": text,
        "model": "text-embedding-ada-002"  # OpenAI's recommended embedding model
    }

    try:
        response = requests.post(OPENAI_URL, json=data, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()["data"][0]["embedding"]  # Extract the embedding from the response
    except requests.exceptions.RequestException as e:
        print(f"API Request Failed: {e}")
        print(f"Response: {response.text if response else 'No response'}")
        return None

def process_and_store_embeddings(input_file, output_json_file, output_embeddings_file):
    """Load product data from JSON, generate embeddings, and save."""
    with open(input_file, "r") as file:
        data = json.load(file)

    products = []
    embeddings = []

    for idx, item in enumerate(data):
        product = item["product"]
        seo_description = product.get("seo_description", "")

        # Generate embedding for the product description
        embedding = get_embedding(seo_description)

        if embedding is not None:
            products.append({
                "title": product.get("title", ""),
                "seo_description": seo_description,
                "vendor": product.get("vendor", ""),
                "price": product.get("price", ""),
                "size": product.get("size", ""),
                "embedding_id": idx  # Assign an embedding ID
            })
            embeddings.append(embedding)

    # Save product metadata to a JSON file
    with open(output_json_file, "w") as file:
        json.dump(products, file, indent=4)

    # Save embeddings to a .npy file
    np.save(output_embeddings_file, np.array(embeddings))

    print(f"Product metadata saved to {output_json_file}")
    print(f"Embeddings saved to {output_embeddings_file}")

if __name__ == "__main__":
    input_file = "/Users/macbookpro/Desktop/Embryolisse2.0/embryolisse-chatbot/backend:/products.json"
    output_json_file = "/Users/macbookpro/Desktop/Embryolisse2.0/embryolisse-chatbot/backend:/products_with_metadata.json"
    output_embeddings_file = "/Users/macbookpro/Desktop/Embryolisse2.0/embryolisse-chatbot/backend:/embeddings.npy"
    process_and_store_embeddings(input_file, output_json_file, output_embeddings_file)