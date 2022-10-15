import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credential){
      return setErrors(['Please provide a credential'])
    }

    if (!password){
      return setErrors(['Please provide a password'])
    }

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="LoginForm_Container">
      <div className="LoginForm_Header">
        <div className="LoginForm_Title">Log In</div>
      </div>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <input
          className="LoginForm_Input"
          type="text"
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
          // required
        />
        <input
          className="LoginForm_Input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
      {/* </label> */}
      <button type="submit" className="login_submit_button">Log In</button>
      <button type="submit" className="login_demouser_button" onClick={(e) => {
        setCredential("new@user.io");
        setPassword('password')
        }}
        >
        Demo User
      </button>
    </form>
  );
}

export default LoginForm;