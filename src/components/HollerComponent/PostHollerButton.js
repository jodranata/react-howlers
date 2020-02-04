import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';
import { HowlTextField, HowlButton } from '../MuiComponents/MuiForm';

import {
  postHollerAction,
  clearErrorsAction
} from '../../states/actions/actionData';

const useStyle = makeStyles({
  dialog: {
    '& .MuiPaper-root': {
      padding: 10,
      backgroundColor: '#07405a'
    }
  },
  ButtonTooltip: {
    position: 'absolute',
    right: 10,
    top: 8,
    padding: 5,
    '& .cancel-post-button': {
      width: 28,
      height: 28,
      color: 'rgb(241, 77, 65)'
    },
    '&:hover': {
      backgroundColor: 'rgba(241, 77, 65, 0.808)',
      '& .cancel-post-button': {
        color: '#d4e0e6'
      }
    }
  },
  postTextfield: {
    marginBottom: 25
  },
  title: {
    color: '#d4e0e6'
  }
});

const PostHollerButton = ({ UI, onPostHoller, onClear }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [error, setError] = useState({});
  const { errors, loading } = UI;
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onClear();
    setOpen(false);
    setError({});
    setBody('');
  };
  const handleChange = e => {
    const { value } = e.target;
    setBody(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const newHoller = {
      body
    };
    onPostHoller(newHoller);
  };
  useEffect(() => {
    if (errors) setError(errors);
    if (!errors && !loading) {
      setBody('');
      handleClose();
    }
  }, [errors, loading]);
  return (
    <>
      <MuiTooltipButton title="Post your howl" onClick={handleOpen}>
        <AddIcon color="inherit" />
      </MuiTooltipButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className={classes.dialog}
      >
        <MuiTooltipButton
          title="Close"
          onClick={handleClose}
          containerClassName={classes.ButtonTooltip}
        >
          <CancelOutlinedIcon className="cancel-post-button" />
        </MuiTooltipButton>
        <DialogTitle className={classes.title}>MAKE A HOLLER</DialogTitle>
        <DialogContent>
          <form className={classes.postForm} onSubmit={handleSubmit}>
            <HowlTextField
              name="body"
              type="text"
              label="HOLLER!"
              multiline
              rows="3"
              placeholder="HOWL A HOLLER TO TO YOUR PACK"
              className={classes.postTextfield}
              value={body}
              onChange={handleChange}
              fullWidth
              error={!!error.body}
              helperText={error.body}
            />
            <HowlButton
              color="primary"
              type="submit"
              variant="contained"
              className={classes.submitButton}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                'HOWL'
              )}
            </HowlButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  UI: state.UIState
});

const mapDispatchToProps = dispatch => ({
  onPostHoller: body => dispatch(postHollerAction(body)),
  onClear: () => dispatch(clearErrorsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostHollerButton);
