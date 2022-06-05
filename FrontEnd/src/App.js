import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./features/auth/login/Login";
import AdminBoard from "./features/AdminBoard/AdminBoard";
import Bases from "./pages/Bases/Bases";
import Home from "./pages/home/Home";
import Logs from "./pages/Logs/Logs";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer /> */}
      <Routes>
        <Route path="*">
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Home />}>
            <Route index element={<Navigate to="users" />} />
            <Route path="admin" element={<AdminBoard />} />
            <Route path="users" element={<Users />} />
            <Route path="bases" element={<Bases />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logs" element={<Logs />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
