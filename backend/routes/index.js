const express = require('express');

const employeesRouter = require('./employees.router');
const requestsRouter = require('./requests.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/employees', employeesRouter);
  router.use('/requests', requestsRouter);
}

module.exports = routerApi;
