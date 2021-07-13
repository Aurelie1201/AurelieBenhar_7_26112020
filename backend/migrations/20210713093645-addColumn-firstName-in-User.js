'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'firstName', { type: Sequelize.DataTypes.STRING, allowNull : false});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'firstName');
  }
};
