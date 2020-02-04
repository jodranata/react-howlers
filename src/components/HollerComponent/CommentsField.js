import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import dayjs from 'dayjs';

import CommentInput from './CommentInput';

const useStyles = makeStyles({
  commentsContainer: {
    color: '#d4e0e6'
  },
  comment: {
    borderTop: '1.1px solid #d4e0e6',
    padding: '8px'
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '5px auto'
  },
  commentContent: {
    '& .comment-time': {
      fontSize: '0.8rem'
    },
    '& .commentator-username': {
      fontSize: '1.2rem',
      paddingBottom: '5px'
    },
    '& .comment-text': {
      fontSize: '1rem',
      fontWeight: 400,
      paddingLeft: '3px',
      textAlign: 'justify',
      paddingRight: '20px'
    }
  }
});

const CommentsField = ({ comments, authenticated, hollerID }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.gridComment}>
        {authenticated && <CommentInput hollerID={hollerID} />}
        {comments.map(comment => {
          const { body, userImage, createdAt, userName } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12} className={classes.comment}>
                <Grid
                  container
                  className={classes.commentsContainer}
                  spacing={1}
                >
                  <Grid item sm={1} className={classes.commentImage}>
                    <img
                      src={userImage}
                      alt="user"
                      className={classes.userImage}
                    />
                  </Grid>
                  <Grid item sm={11} className={classes.commentContent}>
                    <Typography
                      component={Link}
                      to={`/user/${userName}`}
                      color="inherit"
                      className="commentator-username"
                    >
                      {`@${userName}`}
                    </Typography>
                    <Typography variant="body2" className="comment-text">
                      {body}
                    </Typography>
                    <Typography color="textSecondary" className="comment-time">
                      {dayjs(createdAt).fromNow()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.userState.authenticated,
  hollerID: state.dataState.holler.hollerID
});

export default connect(mapStateToProps)(CommentsField);
