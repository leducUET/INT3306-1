import ListTable from "./components/table/Table";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="listTitle">DANH SÁCH CƠ SỞ KINH DOANH</div>
      <ListTable />
    </div>
  );
};

export default Dashboard;
