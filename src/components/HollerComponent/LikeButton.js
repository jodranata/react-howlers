import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FavoriteFullIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';

import {
  likeHollerAction,
  unlikeHollerAction
} from '../../states/actions/actionData';

const isLiked = (userLikes, hollerID) => {
  if (userLikes && userLikes.find(like => like.hollerID === hollerID))
    return true;
  return false;
};
const LIKE_TYPE = 'LIKE';
const UNLIKE_TYPE = 'UNLIKE';

const LikeButton = ({ hollerID, onLikeOrUnlike, user }) => {
  const { authenticated, likes } = user;
  const likeAHoller = () => {
    onLikeOrUnlike(hollerID, LIKE_TYPE);
  };
  const unlikeAHoller = () => {
    onLikeOrUnlike(hollerID, UNLIKE_TYPE);
  };
  if (authenticated) {
    if (isLiked(likes, hollerID)) {
      return (
        <>
          <MuiTooltipButton title="Unlike" onClick={unlikeAHoller}>
            <FavoriteFullIcon color="secondary" />
          </MuiTooltipButton>
        </>
      );
    }
    return (
      <>
        <MuiTooltipButton title="Like" onClick={likeAHoller}>
          <FavoriteBorderIcon color="inherit" />
        </MuiTooltipButton>
      </>
    );
  }
  return (
    <>
      <MuiTooltipButton title="like" routeLink={Link} destination="/login">
        <FavoriteBorderIcon color="inherit" />
      </MuiTooltipButton>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.userState
});

const mapDispatchToProps = dispatch => ({
  onLikeOrUnlike: (hollerID, type) => {
    if (type === LIKE_TYPE) dispatch(likeHollerAction(hollerID));
    else if (type === UNLIKE_TYPE) dispatch(unlikeHollerAction(hollerID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
