import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import axios from 'axios';
import authHeader from './services/auth-header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./components/Login";
import Profile from "./components/Profile";
import AuthService from "./services/auth.service";

const API_URL = 'http://localhost:3000/api/';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    axios.get(API_URL + 'me', { headers: authHeader() })
      .then((response) => {
        if (response.data.jwt && response.data.user) {
          localStorage.setItem('jwt', response.data.jwt);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setCurrentUser(response.data.user);
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('jwt');
        }
      });
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.href = '/'
    window.location.reload()
  };

  return (
    <div>
      <h3>React App</h3>
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={logOut}>
              Sign Out
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={'/c/sign_in'} className="nav-link">
              Sign In
            </Link>
          </li>
        </div>
      )}

      <div className="container mt-3">
        <Routes>
          <Route exact path="/c/sign_in" element={<Login/>} />
          <Route exact path="/c/profile" element={<Profile/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
