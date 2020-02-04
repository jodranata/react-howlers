import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';
import LocationOn from '@material-ui/icons/LocationOn';

import BlankImg from '../../images/blank.png';

const styles = theme => ({
  card: {
    marginBottom: '3px',
    padding: '10px',
    backgroundColor: '#0d2a36',
    border: '1.5px solid #d4e0e6',
    borderRadius: '0px 40px 0px 40px',
    textAlign: 'center'
  },
  CardContent: {
    width: '100%',
    padding: '5px',
    textAlign: 'center',
    '& div': {
      display: 'inline-block',
      backgroundColor: '#d4e0e6',
      color: '#d4e0e6'
    },
    '& hr': {
      display: 'hidden',
      border: 'none'
    },
    '& svg': {
      position: 'relative',
      right: '20px',
      bottom: '5px',
      color: '#d4e0e6'
    }
  },
  cover: {
    width: 180,
    height: 170,
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '15px auto'
  },
  userName: {
    width: 200,
    height: 35,
    marginBottom: '7px'
  },
  bio: {
    width: 120,
    height: 20
  },
  line: {
    width: '40%',
    height: 20,
    marginBottom: '7px',
    marginLeft: '-15px'
  },
  website: {
    width: '60%',
    height: 20,
    marginBottom: '7px',
    marginLeft: '-15px'
  },
  halfline: {
    width: '25%',
    height: 20
  }
});

function HollerSkeleton(props) {
  const { classes } = props;
  const contentSkeleton = (
    <Card className={classes.card}>
      <CardMedia className={classes.cover} image={BlankImg} />
      <CardContent className={classes.CardContent}>
        <div className={classes.userName} />
        <hr />
        <div className={classes.bio} />
        <hr />
        <LocationOn color="inherit" />
        <div className={classes.line} />
        <hr />
        <LinkIcon color="inherit" />
        <div className={classes.website} />
        <hr />
        <CalendarToday color="inherit" />
        <div className={classes.line} />
        <hr />
        <div className={classes.halfline} />
      </CardContent>
    </Card>
  );
  return <>{contentSkeleton}</>;
}

export default withStyles(styles)(HollerSkeleton);
