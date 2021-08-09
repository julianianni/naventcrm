import React, { useEffect } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import AddJob from './AddJob'
import JobsTable from './JobsTable'
import InputSearch from './InputSearch'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../../store/jobs/jobs'
import { singleCompany } from '../../store/companies/singleCompany'
import { getAllAditionalData } from '../../store/aditionalData/actions'
import { getCompanies } from '../../store/companies/companies'

const Jobs = () => {
  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
  }))
  const classes = useStyles()
  const dispatch = useDispatch()
  const { jobs } = useSelector((state) => state)

  // const handleInputChange = (e) => {
  //   const { value } = e.target;
  //   dispatch(getJobsSearch(value));
  // };

  useEffect(() => {
    dispatch(getAllJobs())
    dispatch(getAllAditionalData())
    dispatch(getCompanies())
    dispatch(singleCompany({}))
  }, [dispatch])

  return (
    <>
      <div style={{ marginLeft: 450, marginTop: 30, paddingBottom: 23 }}>
        <AddJob />
      </div>
      {/* <InputSearch handleInputChange={handleInputChange} /> */}
      <InputSearch />
      <Paper className={classes.pageContent}>
        {jobs.length > 0 ? (
          <JobsTable jobs={jobs} />
        ) : (
          <h1>No hay resultados...</h1>
        )}
      </Paper>
    </>
  )
}

export default Jobs
