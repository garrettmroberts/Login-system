import React, { useState } from 'react';
import Lock from '../../../node_modules/bootstrap-icons/icons/lock.svg';
import { useStoreContext } from '../../utils/context';
import API from '../../utils/API';
import * as regex from '../../utils/regexSelectors';
import '../../css/main.css';

const Signup = (props) => {
  const [context, dispatch] = useStoreContext();
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    location: '',
    password: ''
  });

  // Helper function reveals error message based on a given id
  const setInvalid = (id) => {
    document.getElementById(id).classList.add('is-invalid');
    document.getElementById(id).classList.remove('is-valid');
  }

  // Helper function shows positive visuals for valid input
  const setValid = (id) => {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(id).classList.add('is-valid');
  }

  // Helper function takes type and value and updates UI based on regexes and/or input length
  const checkValidity = (type, value) => {
    switch(type) {
      case 'email':
        regex.email.test(value) ? setValid('inputEmail') : setInvalid('inputEmail');
        break;
      case 'firstName':
        (value.length >= 1) ? setValid('inputFirstName') : setInvalid('inputFirstName');
        break;
      case 'lastName':
        (value.length >= 1) ? setValid('inputLastName') : setInvalid('inputLastName');
        break;
      case 'location':
        (value.length >= 1) ? setValid('inputLocation') : setInvalid('inputLocation');
        break;
      case 'password':
        regex.password.test(value) ? setValid('inputPassword') : setInvalid('inputPassword');
        break;
    }
  }

  // Updates form state and UI on input change
  const handleInputChange = event => {
    const { dataset, value } = event.target;

    setState({
      ...state,
      [dataset.type]: value
    });
    
    checkValidity(dataset.type, value);
  };

  // Submits form to backend API, registering a user in the db
  const handleFormSubmit = event => {
    event.preventDefault();
    // Provides feedback if all fields are not correctly formatted or not filled in
    if (document.getElementsByClassName('is-valid').length < 5) {
      checkValidity('email', state.email);
      checkValidity('firstName', state.firstName);
      checkValidity('lastName', state.lastName);
      checkValidity('location', state.location);
      checkValidity('password', state.password);
    } else {
      // API call
      API.signup({
        email: state.email,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        location: state.location
      })
      // Registers user in React Context, logs in, and redirects to home page
      .then(res => {
        API.login({email: state.email, password: state.password}).then((res2) => {
          const user = res.data;
          dispatch({payload: user, type: 'login'});
          props.history.push('/home');
        })
      })
      // Catches error if email is already in use
      .catch(err => {
        setState({
          ...state,
          errorMessage: 'It looks like this email is already being used for another account.'
        });
        document.getElementById('inputEmail').classList.add('is-invalid');
        document.getElementById('inputEmail').classList.remove('is-valid');
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
          pattern='[a-zA-Z0-9!@#$%^*()?]{8,}'
          required
        />
        <div className='invalid-feedback'>Password must be at least eight characters long. </div>
      </div>
      <button className='btn btn-lg btn-primary btn-block' type='submit' onClick={handleFormSubmit}>
        Sign up
      </button>
      <small className='form-text'>{state.errorMessage}</small>
    </form>
  )
};

export default Signup;