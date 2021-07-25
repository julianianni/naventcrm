const { Recruiters } = require('../db/models')
const { findOne } = require('../db/models/recruiters')
const { Op } = require('sequelize')

const recruitersController = {
  async findAll(req, res, next) {
    try {
      const recrutiers = await Recruiters.findAll()
      res.status(200).json(recrutiers)
    } catch (err) {
      next(err)
    }
  },

  async findOrCreateRecruiter(req, res, next) {
    try {
      console.log(req.body)
      const {
        name,
        surname,
        email,
        country,
        state,
        bio,
        img,
        rating,
        favoriteArea1,
        favoriteArea2,
        favoriteArea3,
        seniority1,
        seniority2,
        seniority3,
      } = req.body

      const [recrutier, created] = await Recruiters.findOrCreate({
        where: { email },
        defaults: {
          name,
          surname,
          country,
          state,
          bio,
          img,
          rating,
          favoriteArea1,
          favoriteArea2,
          favoriteArea3,
          seniority1,
          seniority2,
          seniority3,
        },
      })

      if (created) res.status(201).json(recrutier)
      else res.sendStatus(500)
    } catch (err) {
      next(err)
    }
  },

  async updateByPk(req, res, next) {
    try {
      const {
        name,
        surname,
        email,
        country,
        state,
        bio,
        img,
        rating,
        favoriteArea1,
        favoriteArea2,
        favoriteArea3,
        seniority1,
        seniority2,
        seniority3,
      } = req.body

      const [update, recrutier] = await Recruiters.update(
        {
          name,
          surname,
          email,
          country,
          state,
          bio,
          img,
          rating,
          favoriteArea1,
          favoriteArea2,
          favoriteArea3,
          seniority1,
          seniority2,
          seniority3,
        },
        { where: { id: req.params.id }, returning: true }
      )

      res.status(200).json(recrutier)
    } catch (err) {
      next(err)
    }
  },

  async destroyRecrutierByPk(req, res, next) {
    try {
      const destroyedUser = await Recruiters.findByPk(req.params.id)
      await Recruiters.destroy({ where: { id: req.params.id } })
      res.status(200).send(destroyedUser)
    } catch (err) {
      next(err)
    }
  },
  async SearchByName(req, res, next) {
    try {
      const recruiters = await Recruiters.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${req.params.name}%`,
              },
            },
            {
              surname: {
                [Op.iLike]: `%${req.params.name}%`,
              },
            },
            {
              email: {
                [Op.iLike]: `%${req.params.name}%`,
              },
            },
          ],
        },
      })
      res.status(200).json(recruiters)
    } catch (err) {
      return next(err)
    }
  },
  getTopThreeRecruiters(req, res) {
    Recruiters.findAll({ order: [['rating', 'DESC']], limit: 3 })
      .then((recruiters) => res.status(200).send(recruiters))
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  },
}

module.exports = recruitersController
