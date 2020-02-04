import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import BlankImg from '../../images/blank.png';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: '3px',
    padding: '10px',
    backgroundColor: '#0d2a36',
    border: '1.5px solid #d4e0e6',
    borderRadius: '5.5px'
  },
  CardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: '5px 25px'
  },
  cover: {
    width: 95,
    height: 80,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  userName: {
    width: 150,
    height: 18,
    backgroundColor: '#d4e0e6',
    marginBottom: '7px'
  },
  date: {
    width: 60,
    height: 12,
    backgroundColor: '#065980',
    marginBottom: '7px'
  },
  line: {
    width: '90%',
    height: 18,
    backgroundColor: '#d4e0e6',
    marginBottom: '7px'
  },
  halfline: {
    width: '45%',
    height: 18,
    backgroundColor: '#cedae0'
  }
});

function HollerSkeleton(props) {
  const { classes } = props;
  const contentSkeleton = Array.from({ length: 4 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={BlankImg} />
      <CardContent className={classes.CardContent}>
        <div className={classes.userName} />
        <div className={classes.date} />
        <div className={classes.line} />
        <div className={classes.line} />
        <div className={classes.halfline} />
      </CardContent>
    </Card>
  ));
  return <>{contentSkeleton}</>;
}

export default withStyles(styles)(HollerSkeleton);
