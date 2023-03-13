/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */

const categoryNewModel = (sequelize, DataTypes) => {
 const Category = sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING
    },

    {
      timestamps: false,
      underscored: true,
      tableName: 'categories',
    },
  );

  return Category;
};

module.exports = categoryNewModel;