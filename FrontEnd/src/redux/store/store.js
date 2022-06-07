import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slices/authSlice";
import adminReducer from "../../features/AdminBoard/adminSlice";
import moderatorReducer from "../../features/Morderator/moderatorSlice";

const rootReducer = {
  auth: authReducer,
  admin: adminReducer,
  moderator: moderatorReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
