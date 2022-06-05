import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slices/auth";
import messageReducer from "../../features/auth/slices/message";
import adminReducer from "../../features/AdminBoard/adminSlice";

const rootReducer = {
  auth: authReducer,
  message: messageReducer,
  admin: adminReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
