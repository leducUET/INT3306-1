import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "API_URL/api/test";

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userServices = {
  getAdminBoard,
  getModeratorBoard,
  getUserBoard,
};

export default userServices;
