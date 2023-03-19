import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

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
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{`Hello, ${user.firstName}.`}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={manageListing}>Manage Spots</button>
        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
