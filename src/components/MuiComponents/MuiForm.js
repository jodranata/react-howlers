import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

export const HowlTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#e05c3b'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgb(241, 77, 65)'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e05c3b'
    },
    '& label': {
      color: '#fff'
    },
    '& .MuiInputBase-input': {
      padding: '6px 0 7px 7px',
      color: '#fff'
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: '2px solid rgba(67, 255, 230, 0.788)'
    }
  }
})(TextField);

export const HowlButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[300]),
    backgroundColor: orange[700],
    '&:hover': {
      backgroundColor: orange[900],
      color: '#fff'
    }
  }
}))(Button);
