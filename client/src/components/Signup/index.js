import React, { useState } from 'react';
import Lock from '../../../node_modules/bootstrap-icons/icons/lock.svg';

import API from '../../utils/API';
import '../../css/main.css';

const Signup = () => {
  const [state, setState] = useState({});

  const handleInputChange = event => {
    const { dataset, value } = event.target;

    setState({
      ...state,
      [dataset.type]: value
    });

    if (dataset.type === 'email') {
      if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) {
        document.getElementById('inputEmail').classList.add('is-invalid');
        document.getElementById('inputEmail').classList.remove('is-valid');
      } else {
        document.getElementById('inputEmail').classList.remove('is-invalid');
        document.getElementById('inputEmail').classList.add('is-valid');
      }
    }

    if (dataset.type === 'firstName') {
      if (value.length === 0) {
        document.getElementById('inputFirstName').classList.add('is-invalid');
        document.getElementById('inputFirstName').classList.remove('is-valid');
      } else {
        document.getElementById('inputFirstName').classList.remove('is-invalid');
        document.getElementById('inputFirstName').classList.add('is-valid');
      }
    }

    if (dataset.type === 'lastName') {
      if (value.length === 0) {
        document.getElementById('inputLastName').classList.add('is-invalid');
        document.getElementById('inputLastName').classList.remove('is-valid');
      } else {
        document.getElementById('inputLastName').classList.remove('is-invalid');
        document.getElementById('inputLastName').classList.add('is-valid');
      }
    }

    if (dataset.type === 'location') {
      if (value.length === 0) {
        document.getElementById('inputLocation').classList.add('is-invalid');
        document.getElementById('inputLocation').classList.remove('is-valid');
      } else {
        document.getElementById('inputLocation').classList.remove('is-invalid');
        document.getElementById('inputLocation').classList.add('is-valid');
      }
    }

    if (dataset.type === 'password') {
      if (!/[a-zA-Z0-9!@#$%^&*()?]{8,}/.test(value)) {
        document.getElementById('inputPassword').classList.add('is-invalid');
        document.getElementById('inputPassword').classList.remove('is-valid');
      } else {
        document.getElementById('inputPassword').classList.remove('is-invalid');
        document.getElementById('inputPassword').classList.add('is-valid');
      }
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (document.getElementsByClassName('is-valid').length < 5) {
      return;
    } else {
      API.signup({
        email: state.email,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        location: state.location
      })
      .then(res => console.log(res))
      .catch(err => {
        setState({
          ...state,
          errorMessage: 'It looks like this email is already being used for another account.'
        })
      })
    }
  };

  return(
    <form id='form-signup' action='/api/users/'>
      <img src={Lock} id='signUpLock' className='mb-4' alt='lock icon'/>
      <h1 className='h3 mb-3 font-weight-normal'>Sign up</h1>
      <div className="input-group mb-2">
        <label htmlFor='inputEmail' className='sr-only'>Email Address</label>
        <input
          type='email'
          id='inputEmail'
          data-type='email'
          className='form-control mb-1'
          placeholder='Email address'
          pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
          onChange={handleInputChange}
          required
        />
        <div className='invalid-feedback'>Invalid Email Address.</div>
      </div>
      <div className="input-group mb-2">
        <label htmlFor='inputFirstName' className='sr-only'>First Name</label>
        <input
          type='text'
          id='inputFirstName'
          data-type='firstName'
          className='form-control mb-1'
          placeholder='First Name'
          onChange={handleInputChange}
          required
        />
        <div className='invalid-feedback'>This field is required.</div>
      </div>
      <div className="input-group mb-2">
        <label htmlFor='inputLastName' className='sr-only'>Last Name</label>
        <input
          type='text'
          id='inputLastName'
          data-type='lastName'
          className='form-control mb-1'
          placeholder='Last Name'
          onChange={handleInputChange}
          required
        />
        <div className='invalid-feedback'>This field is required.</div>
      </div>
      <div className='input-group mb-2'>
        <label htmlFor='inputLocation' className='sr-only'>Location</label>
        <input
          type='text'
          id='inputLocation'
          data-type='location'
          className='form-control mb-1'
          placeholder='Location'
          onChange={handleInputChange}
          required
        />
        <div className='invalid-feedback'>This field is required.</div>
      </div>
      <div className='input-group mb-2'>
        <label htmlFor='inputPassword' className='sr-only'>Password</label>
        <input
          type='password'
          id='inputPassword'
          data-type='password'
          className='form-control mb-1'
          placeholder='password'
          onChange={handleInputChange}
          pattern='[a-zA-Z0-9!@#$%^&*()?]{8,}'
          title='Password must be at least eight characters long and may include lowercase and uppercase letters, numbers, and special characters.'
          required
        />
        <div className='invalid-feedback'>Password must be at least eight characters long. </div>
      </div>
      <button className='btn btn-lg btn-primary btn-block' type='submit' onClick={handleFormSubmit}>
        Login
      </button>
      <small className='form-text'>{state.errorMessage}</small>
    </form>
  )
};

export default Signup;