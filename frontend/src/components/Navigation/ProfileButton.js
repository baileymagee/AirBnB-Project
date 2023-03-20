import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // console.log(user);
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
          <i className="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
      <div className="profile-menu">
        <ul className={ulClassName} ref={ulRef}>
          <div className="profile-name">{`Hello, ${user.firstName}.`}</div>
          <div className="profile-email">{user.email}</div>
          <div className="manage-btn">
            <button onClick={manageListing}>Manage Spots</button>
          </div>
          <div className="log-out-btn">
            <button onClick={logout}>Log Out</button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
