const S = require('sequelize')
const db = require('../db')

class Jobs extends S.Model {}

Jobs.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    // area: {
    //     type: S.STRING,
    //     allowNull:false
    // },
    // seniority: {
    //     type: S.STRING,
    //     allowNull: false
    // },
    description: {
      type: S.TEXT,
      allowNull: false,
    },
    country: {
      type: S.STRING,
      allowNull: false,
    },
    rating: {
      type: S.STRING,
      defaultValue: 0,
    },
    date: {
      type: S.DATE,
      defaultValue: new Date(),
    },
    salary: {
      type: S.INTEGER,
    },
    // modality: {
    //     type: S.STRING,
    //     allowNull:false
    // },
    isOpen: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: db, modelName: 'jobs' }
)

module.exports = Jobs
