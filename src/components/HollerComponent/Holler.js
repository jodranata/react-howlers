import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeletePostButton from '../ProfileComponent/DeletePostButton';
import HollerDetails from './HollerDetails';
import LikeButton from './LikeButton';

const useStyle = makeStyles({
  card: {
    display: 'flex',
    marginBottom: '3px',
    padding: '10px',
    backgroundColor: '#0d2a36',
    boxShadow: 'none',
    color: '#d4e0e6',
    border: '1.5px solid #d4e0e6',
    borderRadius: '5.5px',
    position: 'relative',
    transition: 'box-shadow 0.3s, background-color 0.3s',
    '&:hover': {
      backgroundColor: '#003449e3',
      boxShadow: 'inset 0 0 12px 2px rgba(0,0,0,0.5)'
    }
  },
  image: {
    minWidth: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '3px groove #d4e0e6',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'inline-block'
  },
  content: {
    paddingTop: '0px',
    '& .MuiIconButton-root': {
      padding: '7px',
      color: '#cbeaf8',
      '&:hover': {
        backgroundColor: '#d4e0e6',
        color: '#09384b'
      }
    },
    '& .text-post': {
      position: 'relative',
      wordBreak: 'break-word',
      textAlign: 'justify',
      paddingRight: '5px'
    },
    '& .details-tag': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& .comment-tag': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& *': {
          margin: '0 5px'
        }
      }
    }
  },
  spandetails: {
    marginRight: '10px'
  }
});

function Holler({ holler, user, openDialog }) {
  dayjs.extend(relativeTime);
  const classes = useStyle();

  const {
    userName, // userName of post creator
    body,
    imageURL,
    createdAt,
    likeCount,
    commentCount,
    hollerID
  } = holler;
  const { authenticated, credentials } = user;
  //  userName of the user, currentyly signed In
  const signedInUser = credentials.userName;

  const showDeleteButton =
    authenticated && userName === signedInUser ? (
      <DeletePostButton hollerID={hollerID} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={imageURL}
        title="Profile Image"
        className={classes.image}
      />

      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/user/${userName}`}
          color="inherit"
        >
          {`@${userName}`}
        </Typography>

        <Typography variant="body2" color="primary">
          {dayjs(createdAt).fromNow()}
        </Typography>

        <Typography variant="body1" className="text-post">
          {body}
        </Typography>
        <div className="details-tag">
          <LikeButton hollerID={hollerID} />
          <span className={classes.spandetails}>{`${likeCount} likes`}</span>
          <div className="comment-tag">
            <ChatIcon color="inherit" />
            <span className={classes.spandetails}>
              {`${commentCount} comments`}
            </span>
          </div>
          <HollerDetails
            hollerID={hollerID}
            userName={userName}
            openDialog={openDialog}
          />
        </div>

        {showDeleteButton}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = state => ({
  user: state.userState
});

export default connect(mapStateToProps)(Holler);
