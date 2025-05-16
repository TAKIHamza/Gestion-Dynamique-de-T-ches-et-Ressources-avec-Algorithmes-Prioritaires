// frontend/services/allocationService.js
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const storeAuthToken = (token) => {
  setCookie("auth_token", token, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};
const authHeaders = () => {
  const token = getCookie("auth_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
};

// 🔐 Auth Services
export const loginUser = async (credentials) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/api/auth/login/`,
    credentials,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  
  if (data.access_token || data.token) {
    storeAuthToken(data.access_token || data.token);
  }
  
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/api/auth/register/`,
    userData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return data;
};

export const logoutUser = async () => {
  
  deleteCookie("auth_token");
  localStorage.removeItem("user");
};

// ... (garder les autres fonctions existantes pour les tâches et ressources)
export async function runAllocation(payload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allocate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      throw new Error("Échec de la simulation d'allocation");
    }
  
    return res.json();
  }
  
  // services/allocationService.js


// 🚀 Tâches
export const fetchTasks = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/tasks/`, authHeaders());
  return data;
};

export const createTask = async (taskData) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/tasks/`, taskData, authHeaders());
  return data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await axios.put(`${API_BASE_URL}/api/tasks/${id}/`, taskData, authHeaders());
  return data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE_URL}/api/tasks/${id}/`, authHeaders());
};

// 🚀 Ressources
export const fetchResources = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/resources/`, authHeaders());
  return data;
};

export const createResource = async (resourceData) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/resources/`, resourceData, authHeaders());
  return data;
};

export const updateResource = async (id, resourceData) => {
  const { data } = await axios.put(`${API_BASE_URL}/api/resources/${id}/`, resourceData, authHeaders());
  return data;
};

export const deleteResource = async (id) => {
  await axios.delete(`${API_BASE_URL}/api/resources/${id}/`, authHeaders());
};
