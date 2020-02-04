import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';

import dayjs from 'dayjs';

import { getUserDataAction } from '../states/actions/actionData';
import Holler from '../components/HollerComponent/Holler';

const useStyle = makeStyles({
  userDetails: {
    paddingTop: '50px',
    color: '#d4e0e6',
    '& .user-profile': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& .profile-image': {
        width: 175,
        height: 175,
        borderRadius: '50%',
        border: '3px ridge #d4e0e6',
        objectFit: 'cover'
      },
      '& .profile-name': {
        fontSize: '3rem',
        margin: '0',
        borderBottom: '1px solid #d4e0e6',
        width: '100%',
        paddingBottom: '10px',
        textAlign: 'center'
      },
      '& .profile-bio': {
        fontSize: '1.5rem'
      }
    }
  },
  userlocationweb: {
    display: 'flex',
    padding: '0px 10px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '& .profile-locationweb': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px 10px',
      '& *': {
        margin: '0 3px'
      }
    }
  },
  joinedDate: {
    display: 'flex',
    alignItems: 'center',
    '& *': {
      margin: '3px'
    }
  },
  userPost: {
    margin: '50px auto'
  },
  circular: {
    textAlign: 'center',
    padding: '100px 5px'
  }
});
const LoadedProfile = ({ hollers, userData, hollerIDparams }) => {
  const classes = useStyle();
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (hollerIDparams) setOpen(true);
  }, [hollerIDparams]);
  const { userName, createdAt, imageURL, website, bio, location } = userData;
  const hollersMarkUp = hollers.map(holler => {
    if (holler.hollerID !== hollerIDparams) {
      return (
        <Holler holler={holler} key={holler.hollerID} openDialog={false} />
      );
    }
    return <Holler holler={holler} key={holler.hollerID} openDialog={isOpen} />;
  });
  return (
    <div className={classes.userDetails}>
      <div className="user-profile">
        <img src={imageURL} alt="profile" className="profile-image" />
        <h3 className="profile-name">{`@${userName}`}</h3>
        {bio && <p className="profile-bio">{bio}</p>}
        <div className={classes.userlocationweb}>
          {location && (
            <div className="profile-locationweb">
              <LocationOn color="inherit" />
              <span>{`${location}`}</span>
            </div>
          )}

          {website && (
            <div className="profile-locationweb">
              <LinkIcon color="inherit" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </div>
          )}
        </div>
        <div className={classes.joinedDate}>
          <CalendarToday color="inherit" />
          <span>{`Joined ${dayjs(createdAt).format('DD MMM YYYY')}`}</span>
        </div>
      </div>
      <div className={classes.userPost}>{hollersMarkUp}</div>
    </div>
  );
};

function User({ data, UI, onRendered, match }) {
  const classes = useStyle();
  const userParams = match.params.userName;
  const hollerParams = match.params.hollerID;
  const [error, setError] = useState({});
  const [hollerIDparams, setHollerIDparam] = useState(null);
  const { errors } = UI;
  useEffect(() => {
    onRendered(userParams);
    if (errors) setError(errors);
    if (hollerParams) setHollerIDparam(hollerParams);
  }, [userParams, errors, hollerParams]);
  const { hollers, userData, loading } = data;
  if (!error.error) {
    if (loading) {
      return (
        <div className={classes.circular}>
          <CircularProgress color="secondary" size={150} thickness={2.1} />
        </div>
      );
    }
    return (
      <LoadedProfile
        hollers={hollers}
        userData={userData}
        hollerIDparams={hollerIDparams}
      />
    );
  }
  return <h1>{error.error}</h1>;
}

const mapStateToProps = state => ({
  data: state.dataState,
  UI: state.UIState
});

const mapDispatchToProps = dispatch => ({
  onRendered: userName => dispatch(getUserDataAction(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
