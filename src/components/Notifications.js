import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { markNotifReadActions } from '../states/actions/actionUsers';

const useStyle = makeStyles({
  menuNotif: {
    '& .MuiMenu-paper': {
      backgroundColor: '#014d6b',
      color: '#d4e0e6'
    }
  }
});

const Notifications = ({ notifications, onMarkRead }) => {
  const classes = useStyle();
  dayjs.extend(relativeTime);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = e => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpened = () => {
    const unreadNotifIds = notifications
      .filter(notif => !notif.read)
      .map(notif => notif.notificationID);
    onMarkRead(unreadNotifIds);
  };

  let displayedNotifIcons;
  if (notifications && notifications.length > 0) {
    const numberOfUnreadNotif = notifications.filter(
      notif => notif.read === false
    ).length;
    displayedNotifIcons =
      numberOfUnreadNotif > 0 ? (
        <Badge badgeContent={numberOfUnreadNotif} color="secondary">
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsIcon />
      );
  } else {
    displayedNotifIcons = <NotificationsIcon />;
  }

  const notificationsMarkUp =
    notifications && notifications.length > 0 ? (
      notifications.map(notif => {
        const { type, createdAt, read, recipient, sender, hollerID } = notif;
        const action = type === 'like' ? 'Liked' : 'Commented on';
        const time = dayjs(createdAt).fromNow();
        const iconColor = read ? 'inherit' : 'secondary';

        const icon =
          type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: '10px' }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: '10px' }} />
          );

        return (
          <MenuItem key={createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              to={`/user/${recipient}/holler/${hollerID}`}
              color="inherit"
              variant="body1"
            >
              {`${sender} ${action} your holler ${time}`}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no new notifications</MenuItem>
    );
  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {displayedNotifIcons}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onExit={handleMenuOpened}
        className={classes.menuNotif}
      >
        {notificationsMarkUp}
      </Menu>
    </>
  );
};

const mapStateToProps = state => ({
  notifications: state.userState.notifications
});

const mapDispatchToProps = dispatch => ({
  onMarkRead: notifID => dispatch(markNotifReadActions(notifID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
