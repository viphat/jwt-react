import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Login = (props) => {
  const navigate = useNavigate();
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    AuthService.login(username, password).then(
      () => {
        window.location.href = '/';
        window.location.reload();
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate('/c/profile')
    }
  }, []);

  return (
    <div className="col-md-12">
      <div className="container" style={{ width: '450px'}}>
        <form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="mt-2 form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Sign In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
