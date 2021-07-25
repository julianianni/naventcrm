const express = require('express')
const router = express.Router()
const companiesController=require('../controllers/companiesController')

router.get('/', companiesController.findAll)
router.get("/:search", companiesController.findAllBySearch);
router.get("/jobs/:id", companiesController.getAllJobsByPkCompany);
router.post('/', companiesController.findOrCreateCompanies)
router.put("/:id", companiesController.updateByPk);
router.delete('/:id', companiesController.destroyCompaniesByPk)



module.exports = router
