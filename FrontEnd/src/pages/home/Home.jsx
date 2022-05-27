import "./home.scss";
import { useSelector } from "react-redux";
import { loginSelector } from "../../redux/selectors/selectors";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../components/table/Table";

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
        <div className="listContainer">
          <div className="listTitle">Lists</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
