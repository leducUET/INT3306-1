import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./features/auth/login/Login";
import Home from "./pages/home/Home";
function App() {
  return (
    <Routes>
      <Route path="*">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
