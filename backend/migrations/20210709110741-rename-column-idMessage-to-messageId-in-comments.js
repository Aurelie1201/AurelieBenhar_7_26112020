'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Comments', 'idMessage', 'messageId');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Comments', 'messageId', 'idMessage');
  }
};
