const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class EmployeeService {
  constructor() {
    this.employees = [];
    // this.generate();
  }
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
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
  async delete(id) {
    const exists = await models.Employee.findByPk(id);
    if (!exists) {
      throw boom.notFound('Employee not found');
    }
    await models.Employee.destroy({
      where: {
        id,
      }
    })
    return;
  }
}
module.exports = EmployeeService;
