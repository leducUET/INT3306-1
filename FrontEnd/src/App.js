import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoutes";
import AdminBoard from "./features/AdminBoard/AdminBoard";
import Login from "./features/auth/login/Login";
import ModeratorBoard from "./features/Morderator/ModeratorBoard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Home from "./pages/home/Home";
import { userRoles } from "./helpers/roles";
import Profile from "./features/Profile/Profile";
import PremisesBoard from "./features/premises/PremisesBoard";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="*">
          <Route path="login" element={<Login />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            {/* <Route index element={<Navigate to="" />} /> */}
            <Route
              path="admin"
              element={
                <PrivateRoute roles={[userRoles.admin]}>
                  <AdminBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="moderator"
              element={
                <PrivateRoute roles={[userRoles.moderator]}>
                  <ModeratorBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="premises"
              element={
                <PrivateRoute roles={[userRoles.staff, userRoles.moderator]}>
                  <PremisesBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
