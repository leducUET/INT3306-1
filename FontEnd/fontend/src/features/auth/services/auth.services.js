import axios from "axios";
const API_URL = "API_URL/api/auth";

const login = (formData) => {
  return axios.post(API_URL, formData).then((response) => {
    if (response.data.accesToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
