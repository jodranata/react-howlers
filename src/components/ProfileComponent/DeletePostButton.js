import React, { useState } from 'react';
import { connect } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

import MuiTooltipButton from '../MuiComponents/MuiTooltipButton';

import { deleteAHollerAction } from '../../states/actions/actionData';

const useStyles = makeStyles({
  deleteButton: {
    position: 'absolute',
    right: '10px',
    top: '8px'
  },
  title: {
    color: '#000'
  }
});

const DeletePostButton = ({ onDeleteHoller, hollerID }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    onDeleteHoller(hollerID);
    setOpen(false);
  };
  return (
    <>
      <MuiTooltipButton
        title="Delete Holler"
        placement="top"
        onClick={handleOpen}
        className={classes.deleteButton}
      >
        <DeleteOutlined color="inherit" />
      </MuiTooltipButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className={classes.title}>
          Are you sure want to delete this post?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  onDeleteHoller: hollerID => dispatch(deleteAHollerAction(hollerID))
});

export default connect(null, mapDispatchToProps)(DeletePostButton);
