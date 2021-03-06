import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/auth.services";
import { toast } from "react-toastify";

const userLogin = JSON.parse(localStorage.getItem("userLogin"));

export const login = createAsyncThunk(
  "auth/login",
  // @ts-ignore
  async ({ email, password }) => {
    try {
      const data = await authServices.login({ email, password });
      return { user: data.user };
    } catch (error) {
      toast.error("Đăng nhập không thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  authServices.logout();
});

const initialState = userLogin
  ? { isLoggedIn: userLogin.success, user: userLogin.user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [login.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      }
    },
    // @ts-ignore
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // @ts-ignore
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
