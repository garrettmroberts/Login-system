import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/context';
import API from '../../utils/API';

const Home = props => {
  const [context, dispatch] = useStoreContext();

  useEffect(() => {
    API.checkLoginStatus()
    .then(res => {
      if (!res.data) {
        props.history.push('/signup');
      };
      let user = res.data;
      dispatch({payload: user, type: 'login'});
    })
  }, [])

  return <h1>Home page</h1>
};

export default Home;