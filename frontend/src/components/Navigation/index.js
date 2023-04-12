import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "./icon.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <div className="nav-logo">
        <NavLink exact to="/">
          <img src={logo} alt="logo" height="90px"></img>
        </NavLink>
      </div>
      <div className="nav-right">
        <div className="nav-form">
          {sessionUser ? (
            <NavLink to="/spots/new">Create a new Spot</NavLink>
          ) : (
            false
          )}
        </div>
        {isLoaded && (
          <div className="nav-profile">
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
