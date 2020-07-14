import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch(action.type) {
    case 'login':
      return {
        ...state,
        'loggedIn': true,
        currentUser: action.user
      }
    default:
      console.log('invalid action');
      return state;
  }
};

const StoreProvider = ({ ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    'currentUser': null
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };