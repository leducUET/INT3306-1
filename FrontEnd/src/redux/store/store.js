import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slices/authSlice";
import adminReducer from "../../features/AdminBoard/adminSlice";
import moderatorReducer from "../../features/Morderator/moderatorSlice";
import premisesReducer from "../../features/premises/premisesSlice";
const rootReducer = {
  auth: authReducer,
  admin: adminReducer,
  moderator: moderatorReducer,
  premises: premisesReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
