const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class RequestService {
  constructor() {
    this.generate();
  }

  generate() { }

  async create(data) {
    const newRequest = await models.Request.create(data);
    return newRequest;
  }

  async find() {
    const requests = await models.Request.findAll({
      include: ['employee'],
    });
    return requests;
  }

  async findOne(id) {
    const request = await models.Request.findByPk(id, { include: ['employee'] })
    if (!request) {
      throw boom.notFound('request not found');
    }
    if (request.isBlock) {
      throw boom.conflict('request is block');
    }
    return request;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const exists = await models.Request.findByPk(id);
    if (!exists) {
      throw boom.notFound('Request not found');
    }
    await models.Request.destroy({
      where: {
        id,
      }
    })
    return;
  }
}

module.exports = RequestService;
