const express = require('express');

const usersRoutes = require('./routes/usersRoutes');

const appRouter = express.Router();

appRouter.route('/users/auth/', usersRoutes);

module.exports = appRouter;