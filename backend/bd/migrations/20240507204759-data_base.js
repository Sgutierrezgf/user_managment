'use strict';
const {
  EmployeeSchema,
  EMPLOYEE_TABLE,
} = require('./../models/employee.model');
const { RequestSchema, REQUEST_TABLE } = require('./../models/request.model');
const { UserSchema, USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(EMPLOYEE_TABLE, EmployeeSchema);
    await queryInterface.createTable(REQUEST_TABLE, RequestSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(EMPLOYEE_TABLE);
    await queryInterface.dropTable(REQUEST_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
