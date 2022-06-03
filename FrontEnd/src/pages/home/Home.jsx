import "./home.scss";
import { useSelector } from "react-redux";
import { loginSelector } from "../../redux/selectors/selectors";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  //@ts-ignore
  const { user: currentUser } = useSelector(loginSelector);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
