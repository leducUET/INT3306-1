import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/slices/auth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div className="sidebar">
      <div className="top">
        <Link className="link" to="#">
          <span className="logo">Healthy-first</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {currentUser.role === "admin" && (
            <>
              <p className="title">MAIN</p>
              <Link className="link" to="admin">
                <li>
                  <DashboardIcon className="icon" />
                  <span>AdminBoard</span>
                </li>
              </Link>
            </>
          )}
          {(currentUser.role === "moderator" ||
            currentUser.role === "staff") && <p className="title">Lists</p>}
          {currentUser.role === "moderator" && (
            <Link className="link" to="users">
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
          )}
          {(currentUser.role === "moderator" ||
            currentUser.role === "staff") && (
            <>
              <Link className="link" to="bases">
                <li>
                  <StoreIcon className="icon" />
                  <span>Bases</span>
                </li>
              </Link>
              <p className="title">USEFUL</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Stats</span>
              </li>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li>
              <p className="title">SERVICES</p>
              <Link className="link" to="logs">
                <li>
                  <PsychologyOutlinedIcon className="icon" />
                  <span>Logs</span>
                </li>
              </Link>
              <li>
                <SettingsApplicationsIcon className="icon" />
                <span>Settings</span>
              </li>
            </>
          )}

          <p className="title">USER</p>
          <Link className="link" to="profile">
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
