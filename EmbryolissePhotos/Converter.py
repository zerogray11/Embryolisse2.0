import os
import psycopg2
from PIL import Image
import io

# Database configuration
DB_NAME = "embryolisse"
DB_USER = "postgres"
DB_PASSWORD = "morocaan"
DB_HOST = "localhost"
DB_PORT = "5432"

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
)
cur = conn.cursor()

# Path to the image folder
image_folder = os.path.join(os.path.dirname(__file__), "embryolisse-photos")

# Get product names from the database
cur.execute("SELECT id, name FROM public.products;")
products = cur.fetchall()

# Process each product
for product in products:
    product_id, product_name = product
    
    # Check if product name contains '&' and replace it with 'and' to handle slight mismatches
    product_name_modified = product_name.replace('&', 'and').lower()
    
    # Handle JPG separately for "Protective & Nourishing Lip Balm"
    if product_name_modified == "protective and nourishing lip balm":
        image_extension = ".JPG"
    else:
        image_extension = ".webp"
    
    # Find the matching image file in the folder
    image_path = os.path.join(image_folder, "{}{}".format(product_name.lower(), image_extension))
    
    if os.path.exists(image_path):
        with Image.open(image_path) as img:
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format="WEBP")  # Convert all images to bytea format (WEBP is preferred)
            img_data = img_byte_arr.getvalue()

            # Update database
            cur.execute(
                "UPDATE public.products SET image_url = %s WHERE id = %s;",
                (psycopg2.Binary(img_data), product_id),
            )
            print("Updated image for {}".format(product_name))

# Commit changes and close connection
conn.commit()
cur.close()
conn.close()

print("All images updated successfully!")
