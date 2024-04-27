'use strict';
const {
  EmployeeSchema,
  EMPLOYEE_TABLE,
} = require('./../models/employee.model');
const { RequestSchema, REQUEST_TABLE } = require('./../models/request.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(EMPLOYEE_TABLE, EmployeeSchema);
    await queryInterface.createTable(REQUEST_TABLE, RequestSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(EMPLOYEE_TABLE);
    await queryInterface.dropTable(REQUEST_TABLE);
  },
};
