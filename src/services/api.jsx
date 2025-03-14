import axios from 'axios';

// Axios instance for Spring Boot backend (handles /api/products)
const springBootClient = axios.create({
  baseURL: '/api/products', // Base URL for Spring Boot backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Axios instance for Flask backend (handles all other /api requests)
const flaskClient = axios.create({
  baseURL: '/api', // Base URL for Flask backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for better error handling
const addErrorInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
      return Promise.reject(error);
    }
  );
};

addErrorInterceptor(springBootClient);
addErrorInterceptor(flaskClient);

// Fetch a product by skin type from Spring Boot backend
export const getProductsBySkinType = async (skinTypeName) => {
  try {
    const response = await springBootClient.get('/skintype', { params: { skinTypeName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by skin type ${skinTypeName}:`, error);
    return { data: [] };
  }
};

// Fetch a product by breakout frequency from Spring Boot backend
export const getProductsByBreakout = async (breakoutName) => {
  try {
    const response = await springBootClient.get('/breakout', { params: { breakoutName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by breakout ${breakoutName}:`, error);
    return { data: [] };
  }
};

// Fetch a product by concern from Spring Boot backend
export const getProductsByConcern = async (concernName) => {
  try {
    const response = await springBootClient.get('/concern', { params: { concernName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by concern ${concernName}:`, error);
    return { data: [] };
  }
};

// Fetch a product by target area from Spring Boot backend
export const getProductsByTargetArea = async (targetAreaName) => {
  try {
    const response = await springBootClient.get('/targetarea', { params: { targetAreaName } });
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product by target area ${targetAreaName}:`, error);
    return { data: [] };
  }
};

// Fetch a product for winter from Spring Boot backend
export const getProductsByForWinter = async (forWinter) => {
  try {
    // Convert boolean to string for URL path
    const boolValue = forWinter === true || forWinter === 'true' ? true : false;
    const response = await springBootClient.get(`/forWinter/${boolValue}`);
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product for winter (${forWinter}):`, error);
    return { data: [] };
  }
};

// Fetch a product for sun from Spring Boot backend
export const getProductsByForSun = async (forSun) => {
  try {
    // Convert boolean to string for URL path
    const boolValue = forSun === true || forSun === 'true' ? true : false;
    const response = await springBootClient.get(`/forSun/${boolValue}`);
    return { data: response.data ? [response.data] : [] };
  } catch (error) {
    console.error(`Error fetching product for sun (${forSun}):`, error);
    return { data: [] };
  }
};

// Fetch some data from Flask backend
export const getSomeDataFromFlask = async () => {
  try {
    const response = await flaskClient.get('/some-endpoint');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Flask backend:', error);
    throw error;
  }
};