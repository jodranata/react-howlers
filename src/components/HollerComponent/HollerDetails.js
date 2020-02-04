import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import dayjs from 'dayjs';

import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';

import {
  getAHollerAction,
  clearErrorsAction
} from '../../states/actions/actionData';

import LikeButton from './LikeButton';
import CommentsField from './CommentsField';

const useStyles = makeStyles({
  tooltip: {
    color: 'red'
  },
  dialogContainer: {
    '& .MuiPaper-root': {
      backgroundColor: '#07405a'
    }
  },
  dialogContent: {
    minWidth: 300,
    minHeight: 110,
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    '& .post-details': {
      wordBreak: 'break-word',
      textAlign: 'justify',
      padding: 5,
      color: '#d4e0e6',
      fontSize: '1.5rem'
    }
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '2px auto'
  },
  dialogTooltip: {
    position: 'absolute',
    right: 18,
    top: 8,
    padding: 3,
    '& .cancel-post-button': {
      width: 25,
      height: 25,
      color: 'rgb(241, 77, 65)'
    },
    '&:hover': {
      backgroundColor: 'rgba(218, 15, 0, 0.808)',
      '& .cancel-post-button': {
        color: '#d4e0e6'
      }
    }
  },
  circular: {
    display: 'block',
    margin: '5px auto'
  },
  gridItem: {
    color: '#d4e0e6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '15px',
    '& *': {
      margin: '2px 0'
    }
  },
  postText: {
    padding: '8px 4px'
  },
  likesandcomment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTop: '0.5px solid #d4e0e6',
    padding: '3px',
    '& *': {
      margin: '0px'
    },
    '& .span-tag': {
      margin: '0 8px 0 5px',
      color: '#d4e0e6'
    },
    '& .MuiIconButton-root': {
      padding: '3px',
      color: '#cbeaf8',
      '&:hover': {
        backgroundColor: '#d4e0e6',
        color: '#09384b'
      }
    }
  }
});

const HollerDetails = ({
  hollerID,
  userName,
  holler,
  UI,
  onGetAHoller,
  onClearErrors,
  openDialog
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState('');
  const [nextPath, setNextPath] = useState('');
  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/user/${userName}/holler/${hollerID}`;
    if (oldPath === newPath) oldPath = `/user/${userName}`;
    window.history.pushState(null, null, newPath);
    setOpen(true);
    setNextPath(newPath);
    setPrevPath(oldPath);
    onGetAHoller(hollerID);
  };
  const handleClose = () => {
    window.history.pushState(null, null, prevPath);
    setOpen(false);
    onClearErrors();
  };
  const {
    createdAt,
    likeCount,
    commentCount,
    imageURL,
    body,
    comments
  } = holler;

  useEffect(() => {
    if (openDialog) handleOpen();
  }, [openDialog]);

  const { loading } = UI;

  const LoadedDialog = () => (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <img src={imageURL} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item xs={9} sm={10} className={classes.gridItem}>
        <Typography
          component={Link}
          color="inherit"
          variant="h5"
          to={`/user/${userName}`}
        >
          {`@${userName}`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
      </Grid>
      <Grid item sm={12} className={classes.postText}>
        <Typography variant="body1" className="post-details">
          {body}
        </Typography>
      </Grid>
      <Grid item sm={12} className={classes.likesandcomment}>
        <LikeButton hollerID={hollerID} />
        <span className="span-tag">{`${likeCount} likes`}</span>
        <MuiTooltipButton title="comment">
          <ChatIcon color="inherit" />
        </MuiTooltipButton>
        <span className="span-tag">{`${commentCount} comments`}</span>
      </Grid>
      {comments && <CommentsField comments={comments} />}
    </Grid>
  );
  const dialogMarkUp = loading ? (
    <CircularProgress
      size={90}
      thickness={1.2}
      className={classes.circular}
      color="secondary"
    />
  ) : (
    <LoadedDialog />
  );

  return (
    <>
      <MuiTooltipButton
        onClick={handleOpen}
        title="Expand"
        containerClassName={classes.tooltip}
      >
        <UnfoldMoreIcon color="inherit" />
      </MuiTooltipButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        className={classes.dialogContainer}
        scroll="body"
      >
        <MuiTooltipButton
          title="Close"
          onClick={handleClose}
          containerClassName={classes.dialogTooltip}
        >
          <CloseIcon className="cancel-post-button" />
        </MuiTooltipButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkUp}
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  holler: state.dataState.holler,
  UI: state.UIState
});

const mapDispatchToProps = dispatch => ({
  onGetAHoller: hollerID => dispatch(getAHollerAction(hollerID)),
  onClearErrors: () => dispatch(clearErrorsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(HollerDetails);
