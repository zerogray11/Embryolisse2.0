import psycopg2
from dotenv import load_dotenv
import os
from psycopg2 import OperationalError
# Load environment variables
load_dotenv()

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

# Test the database connection
def test_db_connection():
    conn = get_db_connection()
    if conn:
        print("Database connection successful!")
        cur = conn.cursor()

        # Execute a simple query to verify the connection
        try:
            cur.execute("SELECT version();")
            db_version = cur.fetchone()
            print("Database version:", db_version)
        except Exception as e:
            print("Error executing query:", e)
        finally:
            cur.close()
            conn.close()
    else:
        print("Failed to connect to the database.")

# Run the test
if __name__ == '__main__':
    test_db_connection()