import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/c/sign_in')
    }
  }, []);

  return (
    <>
      { currentUser && (
        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile Page
            </h3>
          </header>
        </div>
      )}
    </>
  )
};

export default Profile;
