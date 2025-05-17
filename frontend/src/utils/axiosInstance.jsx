import axios from "axios";
import { GATEWAY_URL } from "./contants";


const axiosInstance = axios.create({
  baseURL: GATEWAY_URL,
});

export const getVehicleTypes = (wheelCount) => {
  return axiosInstance.get(`/vehicle-types`, {
    params: { wheelCount }
  });
};

export const getVehicles = (typeId) => {
  return axiosInstance.get(`/vehicles`, {
    params: { typeId }
  });
};

export const checkVehicleAvailability = (vehicleId, startDate, endDate) => {  
  return axiosInstance.get(`/vehicles/${vehicleId}/availability`, {
    params: { startDate, endDate }
  });
}

export const createBooking = (bookingData) => {
  return axiosInstance.post(`/bookings`, bookingData);
};



// axiosInstance.interceptors.request.use(
//   async (config) => {
//      // if we want we can configure it accoingly 
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       const { data } = error.response;
//       if (data && data.message === "expired") {
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
