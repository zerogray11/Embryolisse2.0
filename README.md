Skincare Recommendation App: 
This is the React frontend part of our skincare recommendation application that guides users through a questionnaire to provide personalized skincare product recommendations. The app uses a step-by-step approach to collect user preferences and skin-related information, then fetches product recommendations based on the responses.

Features

Questionnaire: A multi-step form that collects user information such as name, age, skin type, skin concerns, and more.
Progress Bar: Visual indicator of the user's progress through the questionnaire.
Product Recommendations: Personalized skincare product recommendations based on user responses.
Product Cards: Display product details, including name, description, price, rating, and discounts.
Favorite Products: Users can mark products as favorites for easy reference.
Responsive Design: The app is designed to work seamlessly across different screen sizes.
Components

Questionnaire

The main component that handles the questionnaire flow. It manages the current step, user responses, and navigation to the summary page.

Steps: A list of questions with their respective types (text, number, boolean, options).
Progress Bar: Displays the user's progress through the questionnaire.
QuestionStep: Renders the current question and handles user input.
Summary: Displays the summary of user responses and product recommendations.
QuestionStep

A component that renders individual questions based on their type (text, number, boolean, options).

Text Input: For questions requiring text input (e.g., name).
Number Input: For questions requiring numeric input (e.g., age).
Boolean Input: For yes/no questions (e.g., "Do you experience drier skin in the winter?").
Options: For multiple-choice questions (e.g., "How would you describe your skin type?").
Summary

Displays the summary of user responses and the recommended products.

Product Cards: Each card displays product details, including name, description, price, rating, and discounts.
Favorite Button: Allows users to mark products as favorites.
Responsive Grid: Products are displayed in a responsive grid layout.
ProductCard

A reusable component that displays individual product details.

Product Image: Placeholder image with hover effect.
Product Details: Name, rating, price, and discount.
Favorite Button: Allows users to mark the product as a favorite.
API Integration

The app integrates with a backend API to fetch product recommendations based on user responses. The following API endpoints are used:

getProductsBySkinType: Fetches products based on skin type.
getProductsByBreakout: Fetches products based on breakout frequency.
getProductsByConcern: Fetches products based on skin concerns.
getProductsByTargetArea: Fetches products based on target areas.
getProductsByForWinter: Fetches products suitable for winter.
getProductsByForSun: Fetches products suitable for sun exposure.
Installation

Clone the repository:
bash
Copy
git clone https://github.com/your-username/skincare-recommendation-app.git
Navigate to the project directory:
bash
Copy
cd skincare-recommendation-app
Install dependencies:
bash
Copy
npm install
Start the development server:
bash
Copy
npm start
Open the app in your browser:
Copy
http://localhost:3000
Usage

Start the Questionnaire: Open the app and start answering the questions.
Progress Through Steps: Use the "Next" button to move through the questionnaire.
View Recommendations: After completing the questionnaire, view the personalized product recommendations.
Mark Favorites: Click the heart icon to mark products as favorites.
Dependencies

React: A JavaScript library for building user interfaces.
React Router DOM: For handling routing within the app.
Lucide React: For icons used in the app (e.g., shopping bag, star, heart).
Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Embryolisse: For the inspiration and branding.
React Community: For the extensive documentation and resources.

