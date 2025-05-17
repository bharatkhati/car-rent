import axios from "axios";
import { GATEWAY_URL } from "./contants";    

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: GATEWAY_URL,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add auth token if exists
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response.data, // Directly return the data
//   (error) => {
//     const errorMessage = error.response?.data?.message || 
//                         error.message || 
//                         "Request failed";
    
//     // Handle specific status codes
//     if (error.response?.status === 401) {
//       // Handle unauthorized (e.g., redirect to login)
//       console.error("Unauthorized access - please login again");
//     } else if (error.response?.status === 404) {
//       console.error("Resource not found");
//     }
    
//     return Promise.reject({
//       message: errorMessage,
//       status: error.response?.status,
//       data: error.response?.data
//     });
//   }
// );

// API endpoints
export const getVehicleTypes = (wheelCount) => {
  return axiosInstance.get("/vehicle-types", { 
    params: { wheelCount },
    paramsSerializer: params => {
      return Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    }
  });
};

export const getVehicles = (typeId) => {
  if (!typeId) {
    return Promise.reject(new Error("typeId is required"));
  }
  return axiosInstance.get("/vehicles", { params: { typeId } });
};

export const checkVehicleAvailability = (vehicleId, startDate, endDate) => {  
  if (!vehicleId || !startDate || !endDate) {
    return Promise.reject(new Error("All parameters are required"));
  }
  return axiosInstance.get(`/vehicles/${vehicleId}/availability`, {
    params: { 
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    }
  });
};

export const createBooking = (bookingData) => {
  if (!bookingData?.firstName || !bookingData?.lastName || 
      !bookingData?.vehicleId || !bookingData?.startDate || !bookingData?.endDate) {
    return Promise.reject(new Error("Missing required booking fields"));
  }
  return axiosInstance.post("/bookings", bookingData);
};

// Helper function
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD format
};

export default axiosInstance;