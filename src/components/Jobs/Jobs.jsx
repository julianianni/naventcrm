import React, { useEffect } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import AddJob from "./AddJob";
import JobsTable from "./JobsTable";
import InputSearch from "./InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, getJobsSearch } from "../../store/jobs/jobs";

const Jobs = () => {
  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state);

  const handleInputChange = (e) => {
    const { value } = e.target;
    //if(value==='')return
    dispatch(getJobsSearch(value));
  };

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  return (
    <>
      <div style={{ marginLeft: 100, marginTop: 30 }}>
        <AddJob />
      </div>  
      <InputSearch handleInputChange={handleInputChange} />
      <Paper className={classes.pageContent}>
        {jobs.length > 0 ? (
          <JobsTable jobs={jobs} />
        ) : (
          <h1>No hay resultados...</h1>
        )}
      </Paper>
    </>
  );
};

export default Jobs;
