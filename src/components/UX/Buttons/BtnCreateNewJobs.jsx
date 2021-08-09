import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const BtnCreateNewJobs = ({ disabled,  name, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {name}
      </Button>
    </div>
  );
};

export default BtnCreateNewJobs
