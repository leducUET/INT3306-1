import axios from "axios";
const API_URL = "http://localhost:8000/api/auth/login";

const login = ({ email, password }) => {
  return axios.post(API_URL, { email, password }).then((response) => {
    if (response.data.success && response.data.user.token) {
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
