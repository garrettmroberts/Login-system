import React, { useState } from 'react';
import Lock from '../../../node_modules/bootstrap-icons/icons/lock.svg';

import API from '../../utils/API';
import '../../css/main.css';


const Login = () => {

  const [state, setState] = useState({
    email: '',
    password: '',
    errorMessage: ''
  })

  const handleInputChange = event => {
    const { type, value } = event.target;
    setState({
      ...state,
      [type]: value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    API.login({
      email: state.email,
      password: state.password
    })
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      setState({
        ...state,
        errorMessage: 'Invalid username or password'
      })
    });
  }

  return (
    <form id='form-login' action='/api/users/login'>
      <img src={Lock} id='loginLock' className='mb-4' alt='lock icon'/>
      <h1 className='h3 mb-3 font-weight-normal'>Login</h1>
      <label htmlFor='inputEmail' className='sr-only'>Email Address</label>
      <input
        type='email'
        id='inputEmail'
        className='form-control mb-2'
        placeholder='Email address'
        onChange={handleInputChange}
        required

      />
      <label htmlFor='inputPassword' className='sr-only'>Password</label>
      <input
        type='password'
        id='inputPassword'
        className='form-control mb-2'
        placeholder='password'
        onChange={handleInputChange}
        required
      />
      <button className='btn btn-lg btn-primary btn-block' type='submit' onClick={handleFormSubmit}>
        Login
      </button>
  <small className='form-text'>{state.errorMessage}</small>
    </form>
  )
};

export default Login;