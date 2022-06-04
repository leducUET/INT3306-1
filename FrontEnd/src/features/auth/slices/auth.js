import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import authServices from "../services/auth.services";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  // @ts-ignore
  async ({ email, password }) => {
    try {
      const data = await authServices.login({ email, password });
      return { user: data.user };
    } catch (error) {
      return error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  authServices.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
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
