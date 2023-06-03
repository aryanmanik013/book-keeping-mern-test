import axios from "axios";

const BASE_URL = "http://localhost:5000";
const handleError = (error) => {
  console.error("API Error:", error.response.status);
};

export const get = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const post = async (url, data) => {
  debugger;
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data);
    console.log("API", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.put(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const deleteReq = async (url) => {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const patch = async (url, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
