import "./login.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const Login = () => {
  const initialState = { username: "", password: "" };

  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
