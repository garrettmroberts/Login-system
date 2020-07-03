import React from 'react';
import './css/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

const Nothing = () => {
  return(
    <h1>Hello</h1>
  )
}

function App() {
  return (
    <Router>
      <div className='d-flex bg-secondary' id='app'>
        <Switch>
          <Route exact path='/' component={Nothing} />
          <Route exact path='/login' component={Login} />
          <Route exact path = '/signup' component={Signup} />
        </Switch>
      </div>
    </Router>
    
    
  );
}

export default App;
