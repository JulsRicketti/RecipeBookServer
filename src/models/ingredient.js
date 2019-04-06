const Sequelize = require('sequelize')

module.exports = function () {
  return function () {
    const app = this
    const sequelize = app.get('sequelize')

    const IngredienteModel = sequelize.define('ingredient', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      recipeId: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      quantity: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      measurement: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }, {
      freezeTableName: true
    })

    IngredienteModel.associate = () => {
      const { recipe } = sequelize.models
      IngredienteModel.belongsTo(recipe, {
        foreignKey: 'recipeId',
        targetKey: 'stableId'
      })
    }

    return IngredienteModel
  }
}
