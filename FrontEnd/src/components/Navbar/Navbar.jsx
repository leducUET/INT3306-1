import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./navbar.scss";

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <strong>
              Xin chào{" "}
              {(currentUser.user.role === "admin"
                ? "admin"
                : currentUser.user.role === "moderator"
                ? "Người điều hành"
                : "Chuyên viên"
              ).toUpperCase()}
              , {currentUser.user.lastName} {currentUser.user.firstName}
            </strong>
            <img
              src={
                currentUser.user.avatar ||
                "https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg"
              }
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
