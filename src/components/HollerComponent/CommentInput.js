import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddCommentIcon from '@material-ui/icons/AddComment';
import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';
import { postCommentAction } from '../../states/actions/actionData';

const useStyles = makeStyles({
  commentForm: {
    color: '#000',
    position: 'relative',
    width: '100%',
    margin: '14px 0'
  },
  commentTextField: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    color: '#fff',
    padding: '3px',
    '& .MuiOutlinedInput-multiline': {
      padding: '5px 8px'
    },
    '& .label': {
      color: 'rgb(241, 77, 65)'
    },
    '& .MuiInputBase-root': {
      border: 'none'
    },
    '& label.Mui-focused': {
      color: 'rgb(241, 77, 65)'
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderColor: 'transparent'
      }
    },
    '& .MuiOutlinedInput-root:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderColor: 'transparent'
      }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderColor: 'transparent'
      }
    },
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: -25,
      fontWeight: 600,
      fontSize: '0.8rem'
    }
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  tooltipComment: {
    '& .MuiIconButton-root': {
      padding: '8px',
      marginLeft: '8px',
      color: '#cbeaf8',
      '&:hover': {
        backgroundColor: '#d4e0e6',
        color: '#09384b'
      }
    }
  },
  linear: {
    width: '100%'
  }
});

const CommentInput = ({ hollerID, UI, onPostComment, commentLoading }) => {
  const { errors } = UI;

  const [body, setBody] = useState('');
  const [error, setError] = useState({});
  const handleChange = e => {
    const { value } = e.target;
    setError({});
    setBody(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      body: body.trim() !== '' ? body : ''
    };
    onPostComment(hollerID, formData);
  };
  useEffect(() => {
    if (errors) setError(errors);
  }, [errors]);
  const classes = useStyles();
  const componentFormMarkUp = !commentLoading ? (
    <TextField
      placeholder="Comment the howl"
      fullWidth
      multiline
      value={body}
      error={!!error.comment}
      helperText={error.comment}
      onChange={handleChange}
      variant="outlined"
      className={classes.commentTextField}
    />
  ) : (
    <div className={classes.linear}>
      <LinearProgress color="secondary" />
    </div>
  );
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.commentForm}
      >
        <Grid container className={classes.gridContainer}>
          <Grid item sm={11}>
            {componentFormMarkUp}
          </Grid>
          <Grid item sm={1} className={classes.tooltipComment}>
            <MuiTooltipButton
              title="Post comment"
              placement="right"
              onClick={handleSubmit}
            >
              <AddCommentIcon
                color="inherit"
                type="submit"
                disabled={commentLoading}
              />
            </MuiTooltipButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  UI: state.UIState,
  commentLoading: state.dataState.commentLoading
});

const mapDispatchToProps = dispatch => ({
  onPostComment: (id, data) => dispatch(postCommentAction(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
