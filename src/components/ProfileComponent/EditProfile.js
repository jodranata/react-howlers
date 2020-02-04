import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogActions';

import EditIcon from '@material-ui/icons/Edit';

import { editUserProfile } from '../../states/actions/actionUsers';
import { HowlTextField } from '../MuiComponents/MuiForm';
import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';

const useStyles = makeStyles({
  dialog: {
    '& .MuiPaper-root': {
      backgroundColor: '#07405a'
    }
  },
  profileForm: {
    padding: 5
  },
  textfield: {
    marginBottom: 12
  },
  dialogactions: {
    color: '#d4e0e6'
  },
  title: {
    color: '#d4e0e6'
  }
});

function EditProfile({ credentials, onEditProfile }) {
  const [bio, setBio] = useState('');
  const [website, setwebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const setUserProfileHook = ({ bio, website, location }) => {
    setBio(bio);
    setwebsite(website);
    setLocation(location);
  };

  const handleOpen = () => {
    setOpen(true);
    setUserProfileHook(credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'bio':
        setBio(value);
        break;
      case 'website':
        setwebsite(value);
        break;
      case 'location':
        setLocation(value);
        break;
      default:
        setBio('');
        setwebsite('');
        setLocation('');
        break;
    }
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };
    onEditProfile(userDetails);
    handleClose();
  };

  useEffect(() => {
    setUserProfileHook(credentials);
  }, []);
  return (
    <>
      <MuiTooltipButton
        title="Edit Profile"
        placement="bottom"
        onClick={handleOpen}
      >
        <EditIcon color="inherit" />
      </MuiTooltipButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className={classes.dialog}
      >
        <DialogTitle className={classes.title}>
          Edit Your Profile Info
        </DialogTitle>
        <DialogContent>
          <form className={classes.profileForm}>
            <HowlTextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              placeholder="Tell us about yourself"
              className={classes.textfield}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <HowlTextField
              name="website"
              type="text"
              label="Website"
              placeholder="Have a website?"
              className={classes.textfield}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <HowlTextField
              name="location"
              type="text"
              label="Location"
              placeholder="Your Location"
              className={classes.textfield}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogactions}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="inherit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = state => ({
  credentials: state.userState.credentials
});

const mapDispatchToProps = dispatch => ({
  onEditProfile: cred => dispatch(editUserProfile(cred))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
