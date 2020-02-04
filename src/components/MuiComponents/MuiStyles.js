import makeStyles from '@material-ui/core/styles/makeStyles';

export const LoginStyles = makeStyles(theme => ({
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
    '& > p': {
      color: '#fff'
    }
  },
  form: {
    display: 'flex',
    marginTop: '25px',
    flexDirection: 'column',
    '& > *': {
      maxWidth: 350,
      margin: '5px auto'
    }
  },
  textfield: {
    width: '350px'
  },
  icon: {
    maxHeight: '100px'
  },
  button: {
    marginTop: '35px',
    color: '#fff',
    fontWeight: 700
  },
  wrongcred: {
    color: 'red',
    fontSize: '15px'
  },
  alink: {
    textDecoration: 'none',
    color: '#20ec7c',
    fontWeight: 700
  }
}));

export const RegisterStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '10px auto'
    }
  },
  emailUserNameBox: {
    width: 550,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    '& *': {
      width: '250px'
    }
  },
  textfield: {
    width: 350
  },
  button: {
    marginTop: '30px',
    color: '#fff',
    fontWeight: 700
  }
}));
