import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import HowlersIcon from '../images/howlersiconwide.png';
import { HowlTextField, HowlButton } from '../components/MuiComponents/MuiForm';
import {
  LoginStyles,
  RegisterStyles
} from '../components/MuiComponents/MuiStyles';
import { setAuthUserAction } from '../states/actions/actionUsers';

const SIGN_UP = 'signup';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

function Signup({ UI, onSignUp, history }) {
  const classes = LoginStyles();
  const signUpClasses = RegisterStyles();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState({});
  const { loading, errors } = UI;

  const dispatch = useDispatch();
  const handleClear = () => dispatch({ type: CLEAR_ERRORS });

  const handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case 'email':
        setEmail(value);
        break;
      case 'userName':
        setUserName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmedPassword':
        setConfirmedPassword(value);
        break;
      default:
        handleClear();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      userName,
      password,
      confirmedPassword
    };
    onSignUp(userData, history, SIGN_UP);
  };

  useEffect(() => {
    if (errors) setError(errors);
  }, [errors]);

  return (
    <div className={classes.login}>
      <img src={HowlersIcon} alt="Howlers Icon" className={classes.icon} />
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={signUpClasses.form}
      >
        <div className={signUpClasses.emailUserNameBox}>
          <HowlTextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
          />
          <HowlTextField
            id="userName"
            label="Username"
            type="text"
            value={userName}
            onChange={handleChange}
            error={!!error.userName}
            helperText={error.userName}
          />
        </div>

        <HowlTextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
          error={!!error.password}
          helperText={error.password}
          className={signUpClasses.textfield}
        />
        <HowlTextField
          id="confirmedPassword"
          label="Confirmed your password"
          type="password"
          value={confirmedPassword}
          onChange={handleChange}
          error={!!error.confirmedPassword}
          helperText={
            error.confirmedPassword && 'Type here to confirm your password'
          }
          className={signUpClasses.textfield}
        />
        <HowlButton
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={signUpClasses.button}
        >
          {loading ? (
            <CircularProgress size={25} color="secondary" />
          ) : (
            'Register'
          )}
        </HowlButton>
      </form>
      <p>
        Already have an account? Go
        <Link to="/login" className={classes.alink} onClick={handleClear}>
          {' '}
          sign in
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.userState,
  UI: state.UIState
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (userData, routeHistory, authType) =>
    dispatch(setAuthUserAction(userData, routeHistory, authType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
