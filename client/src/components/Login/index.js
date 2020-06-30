import React from 'react';
import Lock from '../../../node_modules/bootstrap-icons/icons/lock.svg';
import '../../css/main.css';


const Login = () => {
  return(
    <form id='form-login'>
      <img src={Lock} id='loginLock' className='mb-4' />
      <h1 className='h3 mb-3 font-weight-normal'>Login</h1>
      <label for='inputEmail' className='sr-only'>Email Address</label>
      <input 
        type='email'
        id='inputEmail'
        className='form-control mb-2'
        placeholder='Email address'
        required
      />
      <label for='inputPassword' className='sr-only'>Password</label>
      <input
        type='password'
        id='inputPassword'
        className='form-control mb-2'
        placeholder='password'
        required
      />
      <button class='btn btn-lg btn-primary btn-block' type='submit'>
        Login
      </button>
    </form>
  )
};

export default Login;