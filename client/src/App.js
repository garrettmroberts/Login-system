import React from 'react';
import './css/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreProvider } from './utils/context';
import Home from './pages/Home'
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
      <StoreProvider>
        <div className='d-flex bg-secondary' id='app'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path = '/signup' component={Signup} />
            <Route exact path = '/home' component={Home} />
          </Switch>
        </div>
      </StoreProvider>
    </Router>
    
    
  );
}

export default App;
