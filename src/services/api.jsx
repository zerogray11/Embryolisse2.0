import axios from 'axios';

const API_BASE_URL = '/api/spring'; // Ensure this matches your backend URL

// Create axios instance with default configs
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Fetch a product by skin type
export const getProductsBySkinType = async (skinTypeName) => {
  try {
    const response = await apiClient.get('/products/skintype', { params: { skinTypeName } });
    // Return the single product in an array to maintain consistency with the component logic
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by skin type ${skinTypeName}:`, error);
    return { data: [] };
  }
};

// Fetch a product by breakout frequency
export const getProductsByBreakout = async (breakoutName) => {
  try {
    const response = await apiClient.get('/products/breakout', { params: { breakoutName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by breakout ${breakoutName}:`, error);
    return { data: [] };
  }
};

// Fetch a product by concern
export const getProductsByConcern = async (concernName) => {
  try {
    const response = await apiClient.get('/products/concern', { params: { concernName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by concern ${concernName}:`, error);
    return { data: [] };
  }
};

// Fetch a product by target area
export const getProductsByTargetArea = async (targetAreaName) => {
  try {
    const response = await apiClient.get('/products/targetarea', { params: { targetAreaName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by target area ${targetAreaName}:`, error);
    return { data: [] };
  }
};

// Fetch a product for winter
export const getProductsByForWinter = async (forWinter) => {
  try {
    // Convert boolean to string for URL path
    const boolValue = forWinter === true || forWinter === 'true' ? true : false;
    const response = await apiClient.get(`/products/forWinter/${boolValue}`);
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product for winter (${forWinter}):`, error);
    return { data: [] };
  }
};

// Fetch a product for sun
export const getProductsByForSun = async (forSun) => {
  try {
    // Convert boolean to string for URL path
    const boolValue = forSun === true || forSun === 'true' ? true : false;
    const response = await apiClient.get(`/products/forSun/${boolValue}`);
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product for sun (${forSun}):`, error);
    return { data: [] };
  }
};