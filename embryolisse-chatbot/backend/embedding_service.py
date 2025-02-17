import os
import psycopg2
from dotenv import load_dotenv
from PIL import Image
import io

# Load environment variables
load_dotenv()

# Database connection details
DB_HOST = os.environ.get("DB_HOST")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_PORT = os.environ.get("DB_PORT")

# Connect to the PostgreSQL database
def connect_to_db():
    try:
        connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )
        print("Connected to the database!")
        return connection
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

# Convert WebP image to binary data
def convert_image_to_binary(image_path):
    try:
        with Image.open(image_path) as img:
            # Convert image to 'RGB' and save to a binary buffer
            img = img.convert("RGB")
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format="PNG")  # Save as PNG in the byte buffer
            img_byte_arr.seek(0)
            return img_byte_arr.read()
    except Exception as e:
        print(f"Error converting image {image_path}: {e}")
        return None

# Insert image binary data into PostgreSQL database
def insert_image_to_db(conn, title, image_binary):
    try:
        cursor = conn.cursor()
        # Insert image binary data into the 'products' table
        query = """
            UPDATE products
            SET images = %s
            WHERE title = %s
        """
        cursor.execute(query, (psycopg2.Binary(image_binary), title))
        conn.commit()
        print(f"Image for '{title}' inserted successfully!")
        cursor.close()
    except Exception as e:
        print(f"Error inserting image for {title}: {e}")

# Process all .webp images in the directory and update database
def process_and_insert_images(images_directory):
    # Connect to the database
    conn = connect_to_db()
    if conn is None:
        return

    # Ensure the directory exists
    if not os.path.isdir(images_directory):
        print(f"Error: The directory {images_directory} does not exist.")
        return

    # Process all .webp images in the directory
    for image_filename in os.listdir(images_directory):
        if image_filename.endswith(".webp"):
            title = image_filename.replace(".webp", "")  # Remove the .webp extension for title
            image_path = os.path.join(images_directory, image_filename)

            # Convert image to binary format
            image_binary = convert_image_to_binary(image_path)

            if image_binary:
                # Insert image binary into the database
                insert_image_to_db(conn, title, image_binary)

    # Close the database connection
    conn.close()
    print("Finished processing all images.")

if __name__ == "__main__":
    # Define the directory where your .webp images are stored
    images_directory = "/Users/macbookpro/Desktop/Embryolisse2.0/embryolisse-chatbot/backend/embryolisse-photos"
    process_and_insert_images(images_directory)
