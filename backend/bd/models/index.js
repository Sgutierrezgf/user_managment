const { Employee, EmployeeSchema } = require('./employee.model');
const { Request, RequestSchema } = require('./request.model');

function setupModels(sequelize) {
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Request.init(RequestSchema, Request.config(sequelize));

  Employee.associate(sequelize.models);
  Request.associate(sequelize.models);
}
module.exports = setupModels;
