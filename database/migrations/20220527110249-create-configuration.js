'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Configurations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fromAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      toAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      value: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: true,
      },
      hash: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Configurations');
  },
};
