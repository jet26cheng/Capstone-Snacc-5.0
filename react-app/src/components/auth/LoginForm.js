import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../assets/logo.svg'
import './Login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-container">
      <img className="snacc-rice" src={logo} />
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} id="error-color">{error}</div>
          ))}
        </div>
        <div className="input-grouper">
          <div>Email</div>
          <input
            name='email'
            type='text'
            className="sign-up-input"
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="input-grouper">
          <div>Password</div>
          <input
            name='password'
            type='password'
            className="sign-up-input"
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button id="loginsubmit" type='submit'>Login</button>

        <div>
                <button
                  id="loginsubmit"
                  type='submit'
                  onClick={() => {
                    dispatch(login('demo@aa.io', 'password'))
                  }}
                >Login as Demo User</button>
              </div>
      </form>
    </div>
  );
};

export default LoginForm;
