const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class EmployeeService {
  constructor() {}
  async create(data) {
    const newEmployee = await models.Employee.create(data);
    return newEmployee;
  }
  async find(query) {
    const options = {
      include: ['requests'],
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const employees = await models.Employee.findAll({
      options,
      include: ['requests'],
    });
    return employees;
  }
  async findOne(id) {
    const employee = await models.Employee.findByPk(id, {
      include: ['requests'],
    });
    return employee;
  }
  async update(id, changes) {
    return { id, changes };
  }
  async delete(id) {
    return { id };
  }
}
module.exports = EmployeeService;
