'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'lastName', { type: Sequelize.DataTypes.STRING, allowNull : false});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'lastName');
  }
};
