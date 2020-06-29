import React from 'react';
import './style.css';

const Login = () => {
  return(
    <div className='row d-flex justify-content-center align-items-center' id='loginDiv'>
      <div className='card' id='loginCard'>
        <form>
          <h2>Login</h2>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input type='email' className='form-control' id='email' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Email: </label>
            <input type='password' className='form-control' id='password' />
          </div>
          <button type='submit' class='btn btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default Login;