import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import dayjs from 'dayjs';

import {
  signOutUserAction,
  uploadPhotoProfile
} from '../../states/actions/actionUsers';

import EditProfile from './EditProfile';
import ProfileSkeleton from '../UtilsComponent/ProfileSkeleton';
import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';

const useStyles = makeStyles({
  paper: {
    padding: 20,
    backgroundColor: '#0d2a36',
    border: '5px inset #D5E6E2',
    borderRadius: '0px 40px 0px 40px',
    boxShadow: '0 0 5px 2px rgba(0,0,0,0.2)',
    color: '#d4e0e6',
    '& .MuiIconButton-root': {
      color: '#cbeaf8',
      '&:hover': {
        backgroundColor: '#d4e0e6',
        color: '#09384b'
      }
    }
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .image-container': {
      position: 'relative',
      '& .button': {
        position: 'absolute',
        transform: 'translateX(-50%)',
        bottom: 0
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
      }
    },
    '& .details-container': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#cbeaf8',
      '& *': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        marginTop: 7
      }
    },
    '& .profile-buttons-container': {
      marginTop: 10,
      minWidth: 125,
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around'
    }
  },

  buttons: {
    textAlign: 'center',
    color: '#d4e0e6',
    '& a': {
      margin: '20px 10px',
      color: '#d4e0e6'
    }
  }
});

function AuthProfile({ credentials, classes, actions }) {
  const { userName, createdAt, imageURL, website, bio, location } = credentials;
  const { onSignOut, onUploadPhoto } = actions;
  const handleImageUpload = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    onUploadPhoto(formData);
  };
  const handleMuiButtonClick = () => {
    const fileInput = document.getElementById('changeProfileImage');
    fileInput.click();
  };

  const handleSignOut = () => onSignOut();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-container">
          <img src={imageURL} alt="Profile" className="profile-image" />

          <input
            type="file"
            id="changeProfileImage"
            onChange={handleImageUpload}
            hidden="hidden"
          />

          <MuiTooltipButton
            title="Change Photo"
            placement="right-start"
            className="button"
            onClick={handleMuiButtonClick}
          >
            <EditIcon color="inherit" />
          </MuiTooltipButton>
        </div>

        <div className="details-container">
          <MuiLink
            component={Link}
            to={`users/${userName}`}
            color="inherit"
            variant="h5"
          >
            {`@${userName}`}
          </MuiLink>

          {bio && (
            <Typography variant="body2" color="inherit">
              {bio}
            </Typography>
          )}

          {location && (
            <div>
              <LocationOn color="inherit" />
              <span>{`${location}`}</span>
            </div>
          )}

          {website && (
            <div>
              <LinkIcon color="inherit" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </div>
          )}

          <div>
            <CalendarToday color="inherit" />
            <span>{`Joined ${dayjs(createdAt).format('MMM YYYY')}`}</span>
          </div>
        </div>

        <div className="profile-buttons-container">
          <MuiTooltipButton
            title="Sign Out"
            placement="bottom"
            onClick={handleSignOut}
          >
            <KeyboardReturn color="inherit" />
          </MuiTooltipButton>
          <EditProfile />
        </div>
      </div>
    </Paper>
  );
}

function UnAuthProfile({ classes }) {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" align="center" color="inherit">
        You are signed out.
      </Typography>
      <Typography variant="body2" align="center" color="inherit">
        Sign in first to check your community
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    </Paper>
  );
}

function Profile({ user, onSignOut, onUploadPhoto }) {
  const { credentials, loading, authenticated } = user;
  const actions = {
    onSignOut,
    onUploadPhoto
  };
  const classes = useStyles();
  if (!loading) {
    if (authenticated) {
      return (
        <AuthProfile
          credentials={credentials}
          classes={classes}
          actions={actions}
        />
      );
    }
    return <UnAuthProfile classes={classes} />;
  }
  return <ProfileSkeleton />;
}

const mapStateToProps = state => ({
  user: state.userState
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(signOutUserAction()),
  onUploadPhoto: formData => dispatch(uploadPhotoProfile(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
