import json
import psycopg2

# Database connection details (update as needed)
DB_NAME = "your_database"
DB_USER = "your_username"
DB_PASSWORD = "your_password"
DB_HOST = "localhost"
DB_PORT = "5432"

# Load JSON data
with open("products.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
cur = conn.cursor()

# Create table
cur.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        vendor TEXT,
        collections TEXT,
        size TEXT,
        price TEXT,
        seo_title TEXT,
        seo_description TEXT,
        faqs JSONB,
        benefits JSONB,
        ingredients JSONB,
        usage JSONB,
        eco_conception JSONB
    )
""")

# Insert data
for item in data:
    product = item["product"]

    cur.execute("""
        INSERT INTO products 
        (title, category, vendor, collections, size, price, seo_title, seo_description, faqs, benefits, ingredients, usage, eco_conception) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        product.get("title"),
        product.get("category"),
        product.get("vendor"),
        product.get("collections"),
        product.get("size"),
        product.get("price"),
        product.get("seo_title"),
        product.get("seo_description"),
        json.dumps(product.get("faqs", [])),
        json.dumps(product.get("benefits", [])),
        json.dumps(product.get("ingredients", [])),
        json.dumps(product.get("usage", {})),
        json.dumps(product.get("eco_conception", {}))
    ))

# Commit and close connection
conn.commit()
cur.close()
conn.close()

print("Data successfully inserted into PostgreSQL!")
