import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Routes from './Routes';

const App = props => {
  console.log('Props in App', props);
  return (
    <>
      <Header />
      <Routes />
    </>
  );
};

export default withRouter(App);
