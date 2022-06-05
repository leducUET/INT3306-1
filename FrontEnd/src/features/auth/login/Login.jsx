import "./login.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../../redux/selectors/selectors";
import { login } from "../slices/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const initialState = { email: "", password: "" };

  const [formData, setFormData] = useState(initialState);
  const { isLoggedIn, user } = useSelector(loginSelector);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { email, password } = formData;
    // @ts-ignore
    dispatch(login({ email, password }));
  };

  if (isLoggedIn) {
    if (user.role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="login">
      <form action="" className="loginForm" onSubmit={handleOnSubmit}>
        <h1>Sign In</h1>
        <div className="loginContainer">
          <TextField
            className="input email"
            type="email"
            name="email"
            label="Email"
            onChange={handleOnChange}
            autoFocus
          />
          <TextField
            className="input password"
            type="password"
            name="password"
            label="Password"
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            className="buttonSubmit"
            color="primary"
            variant="contained"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
