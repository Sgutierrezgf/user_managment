const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Request, RequestSchema } = require('./request.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Request.init(RequestSchema, Request.config(sequelize));

  User.associate(sequelize.models);
  Employee.associate(sequelize.models);
  Request.associate(sequelize.models);
}
module.exports = setupModels;
