import React, { useState } from 'react'
import { Grid, Paper, Button, Modal, Fade, Backdrop } from '@material-ui/core'
import useStyles from '../Companies/style'
import { useDispatch, useSelector } from 'react-redux'
import AddUserForm from './AddUserForm'
import styles from '../RecruiterForm/index.module.css'
import axios from 'axios'
import { message, Alert } from 'antd'
import useModal from '../Jobs/useModal'
import { getAll } from '../../store/allUsers/allusers'
export default function AddCompany({ values, setValues, handleInputChange }) {
  const clases = useStyles()
  const dispatch = useDispatch()
  const { open, handleOpen, handleClose, classes, modalStyle } = useModal()
  const [warning, setWarning] = useState('')
  const { role } = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    setWarning('')

    if (values.password !== values.secondpassword)
      return setWarning(
        <Alert message='las contrasenas deben ser iguales' type='warning' />
      )
    if (values.password.length < 6)
      return setWarning(
        <Alert
          message='La contrasena tiene que tener minimo 6 characteres'
          type='warning'
        />
      )
    if (values.name && values.surname && values.email && values.password) {
      return axios
        .post('/api/user/register', values)
        .then((res) => res.data)
        .then((user) => {
          if (user.id) {
            message.success('usuario Agregado con exito!')
            handleClose()
            dispatch(getAll())
            setValues('')
          } else {
            setWarning(<Alert message='Email ya existente' type='warning' />)
          }
        })
        .catch((err) => setWarning(<Alert message={err} type='warning' />))
    } else {
      setWarning(<Alert message='Complete todos los campos' type='warning' />)
    }
  }

  return (
    <Paper className={clases.pageContent}>
      <Grid item xs={6}></Grid>

      <Button
        onClick={handleOpen}
        variant='contained'
        color='primary'
        label='Add'
        disabled={role.name === 'auditor'}
        className={styles.addButton}
      >
        Agregar Usuario
      </Button>

      <Modal
        open={open}
        onClose={() => {
          handleClose()
        }}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 1000 }}
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <AddUserForm
              handleSubmit={handleSubmit}
              values={values}
              handleInputChange={handleInputChange}
              setValues={setValues}
              handleClose={handleClose}
              warning={warning}
            />
          </div>
        </Fade>
      </Modal>
    </Paper>
  )
}
