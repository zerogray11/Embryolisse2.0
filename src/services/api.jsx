import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/products'; // Ensure this matches your backend URL

// Fetch products by skin type
export const getProductsBySkinType = (skinTypeName) =>
  axios.get(`${API_BASE_URL}/skintype`, { params: { skinTypeName } });

// Fetch products by breakout frequency
export const getProductsByBreakout = (breakoutName) =>
  axios.get(`${API_BASE_URL}/breakout`, { params: { breakoutName } });

// Fetch products by concern
export const getProductsByConcern = (concernName) =>
  axios.get(`${API_BASE_URL}/concern`, { params: { concernName } });

// Fetch products by target area
export const getProductsByTargetArea = (targetAreaName) =>
  axios.get(`${API_BASE_URL}/targetarea`, { params: { targetAreaName } });

// Fetch products for winter
export const getProductsByForWinter = (forWinter) =>
  axios.get(`${API_BASE_URL}/forWinter/${forWinter}`);

// Fetch products for sun
export const getProductsByForSun = (forSun) =>
  axios.get(`${API_BASE_URL}/forSun/${forSun}`);