const Sequelize = require('sequelize')

module.exports = function () {
  return function () {
    const app = this
    const sequelize = app.get('sequelize')

    const RecipeModel = sequelize.define('recipe', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      stableId: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      freezeTableName: true
    })

    RecipeModel.associate = () => {
      const { ingredient } = sequelize.models
      RecipeModel.hasMany(ingredient, {
        foreignKey: 'recipeId',
        sourceKey: 'stableId'
      })
    }

    return RecipeModel
  }
}
