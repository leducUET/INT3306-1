import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slices/auth";
import messageReducer from "../../features/auth/slices/message";

const rootReducer = {
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
