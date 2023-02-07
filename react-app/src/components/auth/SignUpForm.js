import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { createStoreThunk } from '../../store/store';
import logo from '../../assets/logo.svg'
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      const store = {
        name: `cart`,
        description: 'descript',
        header: 'header'
      }

      await dispatch(createStoreThunk(store))
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-container">
      <img className="snacc-rice" src={logo} />
      <form id="signupform" onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="input-grouper">
          <div>Username</div>
          <input
            type='text'
            className="sign-up-input"
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="input-grouper">
          <div>Email</div>
          <input
            type='text'
            className="sign-up-input"
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="input-grouper">
          <div>Password</div>
          <input
            type='password'
            className="sign-up-input"
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="input-grouper">
          <div>Repeat Password</div>
          <input
            type='password'
            className="sign-up-input"
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button id="signupsubmit" type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
