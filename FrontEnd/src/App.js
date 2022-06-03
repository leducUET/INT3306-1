import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./features/auth/login/Login";
import Bases from "./pages/Bases/Bases";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/home/Home";
import Logs from "./pages/Logs/Logs";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
function App() {
  return (
    <Routes>
      <Route path="*">
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />}>
          <Route index element={<Navigate to="dashboard" />}></Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="bases" element={<Bases />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
