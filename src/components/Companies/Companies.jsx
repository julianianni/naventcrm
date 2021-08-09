import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCompanies,
} from '../../store/companies/companies'
import useStyles from './style'
import { Paper } from '@material-ui/core'
import CompaniesTable from './CompaniesTable'
import InputSearch from './InputSearch'
import AddCompany from './AddCompany'
import { getAllAditionalData } from '../../store/aditionalData/actions'

export default function Companies() {
  const dispatch = useDispatch()
  const companies = useSelector((state) => state.companies)
  const classes = useStyles()
  const initialFormValues = {
    name: null,
    stateId: null,
    email: null,
    contactName: null,
    img: null,
    description: null,
    areaId: null,
  }

  const [values, setValues] = useState(initialFormValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  React.useEffect(() => {
    dispatch(getCompanies())
    dispatch(getAllAditionalData())
  }, [dispatch])

  return (
    <>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginLeft: 150 }}>
        <AddCompany
          values={values}
          setValues={setValues}
          handleInputChange={handleInputChange}
        />
      </div>
      <InputSearch />

      <Paper className={classes.pageContent}>
        {companies.length > 0 ? (
          <CompaniesTable companies={companies} />
        ) : (
          <h1>No hay resultados...</h1>
        )}
      </Paper>
    </>
  )
}
