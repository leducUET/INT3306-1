import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import StoreIcon from "@mui/icons-material/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/slices/authSlice";
import "./sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("login");
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
              <p className="title">DANH SÁCH</p>
              <Link className="link" to="admin">
                <li>
                  <DashboardIcon className="icon" />
                  <span>Người điều hành</span>
                </li>
              </Link>
            </>
          )}
          {(currentUser.role === "moderator" ||
            currentUser.role === "staff") && <p className="title">DANH SÁCH</p>}
          {currentUser.role === "moderator" && (
            <Link className="link" to="moderator">
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Chuyên viên</span>
              </li>
            </Link>
          )}
          {(currentUser.role === "moderator" ||
            currentUser.role === "staff") && (
            <>
              <Link className="link" to="premises">
                <li>
                  <StoreIcon className="icon" />
                  <span>Cơ sở</span>
                </li>
              </Link>
              <p className="title">TIỆN ÍCH</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Thanh Tra</span>
              </li>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Thông báo</span>
              </li>
              <p className="title">DỊCH VỤ</p>
              <Link className="link" to="logs">
                <li>
                  <PsychologyOutlinedIcon className="icon" />
                  <span>Bản ghi</span>
                </li>
              </Link>
              <li>
                <SettingsApplicationsIcon className="icon" />
                <span>Cài Đặt</span>
              </li>
            </>
          )}

          <p className="title">CÁ NHÂN</p>
          <Link className="link" to="profile">
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Hồ sơ</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
