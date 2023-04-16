import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const disable = () => {
    if (credential.length < 4 || password.length < 6) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="log-in-modal">
      <h1 className="log-in-header">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="username-header">
          Username or Email
          <label className="username-email">
            <input
              className="log-in-field"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Username or Email"
              required
            />
          </label>
        </div>
        <div className="password-header">
          Password
          <label className="password">
            <input
              className="log-in-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
        </div>
        <div className="btns">
          <button className="log-in-btn" type="submit" disabled={disable()}>
            Log In
          </button>
          <button
            className="demo-btn"
            onClick={() =>
              dispatch(
                sessionActions.login({
                  credential: "FakeUser1",
                  password: "password2",
                })
              ).then(closeModal)
            }
          >
            Demo
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
