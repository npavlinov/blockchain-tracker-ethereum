'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      hash: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      configurationId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Configurations',
          key: 'id',
        },
        allowNull: false,
        updatedAt: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Transactions');
  },
};
