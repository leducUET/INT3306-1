import "./login.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSelector,
  messageSelector,
} from "../../../redux/selectors/selectors";
import { clearMessage } from "../slices/message";
import { login } from "../slices/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const initialState = { username: "", password: "" };
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [formData, setFormData] = useState(initialState);
  const { isLoggedIn } = useSelector(loginSelector);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    // @ts-ignore
    dispatch(login({ username, password }));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <form action="" className="loginForm" onSubmit={handleOnSubmit}>
        <h1>Sign In</h1>
        <div className="loginContainer">
          <TextField
            className="input username"
            type="text"
            name="username"
            label="Username"
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
