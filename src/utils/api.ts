import { BASE_URL } from "@/constants/config";
import axios from "axios";

export const apiClient =  axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});
apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    const jwtToken = response.data.token;
    if (jwtToken) {
      localStorage.setItem('jwtToken', jwtToken);
    }
    
    return response;
  },
  (error) => {
    localStorage.setItem('token', 'false');
    return Promise.reject(error);
  }
);



export const filterEmptyString = (params: Record<string, any>) => {
  const result: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      if (typeof value === "string") {
        result[key] = value.trim();
      } else {
        result[key] = value;
      }
    }
  });

  return result;
};