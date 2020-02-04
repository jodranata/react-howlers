import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Holler from '../components/HollerComponent/Holler';
import Profile from '../components/ProfileComponent/Profile';
import { getHollersAction } from '../states/actions/actionData';
import HollerSkeleton from '../components/UtilsComponent/HollerSkeleton';

function Home(props) {
  const { onRendered } = props;
  useEffect(() => {
    onRendered();
  }, []);

  const { data } = props;
  const { hollers, loading } = data;
  const hollersRecentMarkUp = !loading ? (
    hollers.map(holler => <Holler holler={holler} key={holler.hollerID} />)
  ) : (
    <HollerSkeleton />
  );
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        {hollersRecentMarkUp}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Profile />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  data: state.dataState
});

const mapDispatchToProps = dispatch => ({
  onRendered: () => dispatch(getHollersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
