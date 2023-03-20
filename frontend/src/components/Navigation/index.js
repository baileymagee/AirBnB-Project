import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from './icon.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <div className="profile-btn-wrapper">{isLoaded && <ProfileButton user={sessionUser} />}</div>;
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className="nav-bar">
        <div className="nav-logo">
          <NavLink exact to="/">
            <img src={logo} alt='logo' height="90px"></img>
          </NavLink>
        </div>
        <div className="nav-right">
          <div className="nav-form">
            <NavLink to="/spots/new">Create a new Spot</NavLink>
          </div>
          <div className="nav-profile">{isLoaded && sessionLinks}</div>
        </div>
    </div>
  );
}

export default Navigation;
