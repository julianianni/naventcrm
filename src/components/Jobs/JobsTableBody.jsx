import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Fade,
  Backdrop,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { getOneSingleJob } from '../../store/jobs/getSingleJob'
import ModalRecomendation from '../Recomendations/Index'
import styles from '../RecruiterForm/index.module.css'
import useModal from './useModal'
import UpdateJob from './UpdateJob'
import { useHistory } from 'react-router-dom'

const JobsTableBody = ({ jobs }) => {
  const { open, setOpen, handleClose, classes, modalStyle } = useModal()

  const [openRecruiter, setOpenRecruiter] = useState(false)
  const dispatch = useDispatch()

  const history = useHistory()

  const { user } = useSelector((state) => state)

  const [jobValues, setJobValues] = useState()
  const [selectedJob, setSelectedJob] = useState({
    area: '',
    seniority: '',
    id: '',
  })
  const handleUpdateJob = (job) => {
    setJobValues(job)
    setOpen(true)
  }
  const assignRecruiter = () => {
    setOpenRecruiter(true)
  }

  const handleSingleJob = (job) => {
    dispatch(getOneSingleJob(job.id)).then((job) =>
      console.log('GETONE-TABLEBODY', job)
    )
    history.push(`/jobs/${job.id}`)
  }

  const handleViewRecruiter = (recruiter) => {
    history.push(`/recruiters/${recruiter.id}`)
  }
  const handleViewCompany = (company) => {
    history.push(`/companies/${company.id}`)
  }

  return (
    <TableBody>
      {jobs
        ? jobs.map((job) => {
            return (
              <TableRow>
                <TableCell align='center'>
                  <div className={styles.recruiterImgContainer}>
                    {job.company.img ? (
                      <>
                        <img
                          src={job.company.img}
                          alt={job.company.img}
                          className={styles.companyImg}
                          onClick={() => handleViewCompany(job.company)}
                        />
                      </>
                    ) : (
                      <img
                        src='https://static.thenounproject.com/png/3674270-200.png'
                        className={styles.companyImg}
                        alt='Imagen no encontrada'
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell align='center'>{job.title}</TableCell>
                <TableCell align='center'>{job.company.name}</TableCell>
                <TableCell align='center'>{job.area.name}</TableCell>
                <TableCell align='center'>{job.seniority.name}</TableCell>
                <TableCell align='center'>{job.typeemloyed.name}</TableCell>

                <TableCell align='center'>{job.modality.name}</TableCell>

                <TableCell align='center'>{job.state.name}</TableCell>
                <TableCell align='center'>{job.salary}</TableCell>
                <TableCell align='center'>{job.isOpen}</TableCell>
                <TableCell align='center' style={{ padding: '4px' }}>
                  {job.recruiterId ? (
                    <>
                      <div
                        className={styles.recruiterImgContainer}
                        onClick={() => handleViewRecruiter(job.recruiter)}
                      >
                        {job.recruiter.img ? (
                          <img
                            src={job.recruiter.img}
                            alt={job.recruiter.name}
                            className={styles.recruiterImg}
                          />
                        ) : (
                          <img
                            src='https://static.thenounproject.com/png/3674270-200.png'
                            className={styles.recruiterImg}
                            alt='Imagen no encontrada'
                          />
                        )}
                        {job.recruiter.name}
                      </div>
                    </>
                  ) : (
                    //  <h4 className={styles.noRecruiterIcon}  ><TiDelete/></h4>
                    <button
                      className={
                        job.recruiterId ||
                        user.roleId === 4 ||
                        user.roleId === 1
                          ? null
                          : styles.assignRecruiterButton
                      }
                      disabled={
                        job.recruiterId ||
                        user.roleId === 4 ||
                        user.roleId === 1
                      }
                      onClick={() => {
                        setSelectedJob({
                          area: job.area.name,
                          seniority: job.seniority.name,
                          id: job.id,
                        })

                        assignRecruiter()
                      }}
                    >
                      <PersonAddIcon />
                    </button>
                  )}
                </TableCell>

                <TableCell align='center' style={{ padding: '4px' }}>
                  <button
                    className={
                      job.isOpen === 'cerrada' || user.role.name === 'auditor'
                        ? null
                        : styles.editButton
                    }
                    disabled={
                      job.isOpen === 'cerrada' || user.role.name === 'auditor'
                    }
                    onClick={() => {
                      handleUpdateJob(job)
                    }}
                  >
                    <EditIcon />
                  </button>
                </TableCell>
                <TableCell align='center' style={{ padding: '4px' }}>
                  <button
                    className={styles.singleViewButton}
                    onClick={() => handleSingleJob(job)}
                  >
                    <VisibilityIcon />
                  </button>
                </TableCell>
                {/* <TableCell align="center" style={{padding:"4px"}}>
                  <button
                    className={
                      job.recruiterId || user.role.name === 'auditor' || user.role.name === 'operador'
                        ? null
                        : styles.assignRecruiterButton
                    }
                    disabled={
                      job.recruiterId || user.role.name === 'auditor' || user.role.name === 'operador'
                    }
                    onClick={() => {
                      setSelectedJob({
                        area: job.area.name,
                        seniority: job.seniority.name,
                        id: job.id,
                      });

                      assignRecruiter();
                    }}
                  >
                    <PersonAddIcon />
                  </button>
                </TableCell> */}
              </TableRow>
            )
          })
        : null}

      <Modal
        open={open}
        onClose={() => {
          handleClose()
        }}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <UpdateJob job={jobValues} handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>

      <ModalRecomendation
        selectedJob={selectedJob}
        open={openRecruiter}
        setOpenRecruiter={setOpenRecruiter}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        ClassNamePaper={classes.paper}
        modalStyle={modalStyle}
      />
    </TableBody>
  )
}

export default JobsTableBody
