import axios from "axios";
const API_URL = "API_URL/api/auth";

const login = ({ username, password }) => {
  return axios.post(API_URL, { username, password }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authServices = {
  login,
  logout,
};

export default authServices;
