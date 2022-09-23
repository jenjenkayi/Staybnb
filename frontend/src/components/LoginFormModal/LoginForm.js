import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="LoginForm_Header">
        <div className="LoginForm_Title">Log In</div>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      <button type="submit" onClick={(e) => {
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