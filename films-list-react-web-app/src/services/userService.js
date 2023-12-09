import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const API_BASE = process.env.REACT_APP_API_BASE;

export const login = async (credentials) => {
  try {
    const response = await request.post(`${API_BASE}/api/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response (invalid credentials)
      throw new Error("Invalid credentials");
    } else {
      // Handle other kinds of errors (network issues, server errors, etc.)
      throw new Error("Login failed");
    }
  }
};

export const register = async (credentials) => {
  try {
    const response = await request.post(
      `${API_BASE}/api/register`,
      credentials
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Handle forbidden response (username already exists)
      throw new Error("Username already exists");
    } else {
      // Handle other kinds of errors
      throw new Error("Registration failed");
    }
  }
};

export const logout = async () => {
  const response = await request.post(`${API_BASE}/api/logout`);
  return response.data;
};
