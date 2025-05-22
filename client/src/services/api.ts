import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = (userData: any) => api.post('/auth/register', userData);
export const login = (credentials: any) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');

// Properties API
export const getPropertiesForSwiping = (filters?: any) => 
  api.get('/properties/swipe', { params: filters });
export const likeProperty = (propertyId: string) => 
  api.post(`/properties/${propertyId}/like`);
export const dislikeProperty = (propertyId: string) => 
  api.post(`/properties/${propertyId}/dislike`);
export const getLikedProperties = () => api.get('/properties/liked');
export const getPropertyDetails = (propertyId: string) => 
  api.get(`/properties/${propertyId}`);
export const createProperty = (propertyData: any) => 
  api.post('/properties', propertyData);
export const updateProperty = (propertyId: string, propertyData: any) => 
  api.put(`/properties/${propertyId}`, propertyData);
export const deleteProperty = (propertyId: string) => 
  api.delete(`/properties/${propertyId}`);

export default api; 