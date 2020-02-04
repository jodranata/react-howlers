import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';

import MuiTooltipButton from './MuiComponents/MuiTooltipButton';
import PostHollerButton from './HollerComponent/PostHollerButton';
import Notifications from './Notifications';

const CLEAR_ERRORS = 'CLEAR_ERRORS';

const UnAuthNavbar = () => {
  const dispatch = useDispatch();
  const handleClear = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <>
      <Button color="inherit" onClick={handleClear} component={Link} to="/">
        Home
      </Button>
      <Button
        color="inherit"
        onClick={handleClear}
        component={Link}
        to="/login"
      >
        Login
      </Button>
      <Button
        color="inherit"
        onClick={handleClear}
        component={Link}
        to="/signup"
      >
        Sign Up
      </Button>
    </>
  );
};

const AuthNavBar = () => {
  return (
    <>
      <PostHollerButton />
      <MuiTooltipButton title="Home" routeLink={Link} destination="/">
        <HomeIcon color="primary" />
      </MuiTooltipButton>
      <Notifications />
    </>
  );
};

function Navbar({ authenticated }) {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? <AuthNavBar /> : <UnAuthNavbar />}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  authenticated: state.userState.authenticated
});

export default connect(mapStateToProps)(Navbar);
