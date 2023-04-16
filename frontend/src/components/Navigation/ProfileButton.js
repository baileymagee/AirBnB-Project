import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const manageListing = () => {
    history.push("/spots/current");
  };

  return (
    <div className="profile-btn">
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="profile-menu">
          {user ? (
            <>
              <div className="profile-name">{`Hello, ${user.firstName}.`}</div>
              <div className="profile-email">{user.email}</div>
              <div className="manage-btn">
                <button onClick={manageListing}>Manage Spots</button>
              </div>
              <div className="log-out-btn">
                <button onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <OpenModalButton
                className={"menu-button"}
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                className={"menu-button"}
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;
