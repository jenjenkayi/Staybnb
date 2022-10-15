import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './SignupFormModal.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!email && !email.includes('@')) {
      return setErrors(['Please provide a valid email'])
    }

    if (!username) {
      return setErrors(['Please provide a username'])
    }

    if (!password){
      return setErrors(['Please provide a password'])
    }

    if (!confirmPassword){
      return setErrors(['Please provide a password'])
    }

    if (!firstName){
      return setErrors(['Please provide a firstName'])
    }

    if (!lastName){
      return setErrors(['Please provide a lastName'])
    }

    if (password === confirmPassword) {
    setErrors([]);
    return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
      return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className="SignupForm_Container">
      <div className="SignupForm_Header">
        <h3 className="SignupForm_Title">Sign Up</h3>
      </div>
      <ul>
        <div className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </div>
      </ul>
        <input
          className="SignupForm_Input"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
        <input
          className="SignupForm_Input"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          // required
        />
        <input
          className="SignupForm_Input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
        <input
          className="SignupForm_Input"
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          // required
        />
        <input
          className="SignupForm_Input"
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          // required
        />
        <input
          className="SignupForm_Input"
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          // required
        />
      <button type="submit" className="Signup_submit_button">Sign Up</button>
    </form>
  );
}

export default SignupForm;