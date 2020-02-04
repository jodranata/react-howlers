import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import HowlersIcon from '../images/howlersiconwide.png';
import { HowlTextField, HowlButton } from '../components/MuiComponents/MuiForm';
import { LoginStyles } from '../components/MuiComponents/MuiStyles';
import { setAuthUserAction } from '../states/actions/actionUsers';

const LOG_IN = 'login';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

function Login({ UI, onLogin, history }) {
  const classes = LoginStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const { loading, errors } = UI;

  const dispatch = useDispatch();
  const handleClear = () => dispatch({ type: CLEAR_ERRORS });

  const handleChange = e => {
    const { type } = e.target;
    if (type === 'email') {
      return setEmail(e.target.value);
    }
    return setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    onLogin(userData, history, LOG_IN);
  };

  useEffect(() => {
    if (errors) setError(errors);
  }, [errors]);

  return (
    <div className={classes.login}>
      <img src={HowlersIcon} alt="Howlers Icon" className={classes.icon} />
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
        <HowlTextField
          id="standard-email-input"
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          error={!!error.email}
          helperText={error.email}
          className={classes.textfield}
        />
        <HowlTextField
          id="standard-password-input"
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
          error={!!error.password}
          helperText={error.password}
          className={classes.textfield}
        />
        {error.general && <p className={classes.wrongcred}>{error.general}</p>}
        <HowlButton
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          className={classes.button}
          disabled={loading}
        >
          {loading ? <CircularProgress size={25} color="secondary" /> : 'Login'}
        </HowlButton>
      </form>
      <p>
        Don&#39;t have an account? Sign up
        <Link to="/signup" className={classes.alink} onClick={handleClear}>
          {' here'}
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
  onLogin: (userData, routeHistory, authType) =>
    dispatch(setAuthUserAction(userData, routeHistory, authType))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
