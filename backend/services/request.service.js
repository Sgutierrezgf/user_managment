const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class RequestService {
  constructor() {
    this.generate();
  }

  generate() {}

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
    const request = this.requests.find((item) => item.id === id);
    if (!request) {
      throw boom.notFound('request not found');
    }
    if (request.isBlock) {
      throw boom.conflict('request is block');
    }
    return request;
  }

  async update(id, changes) {
    const index = this.requests.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('request not found');
    }
    const request = this.requests[index];
    this.requests[index] = {
      ...request,
      ...changes,
    };
    return this.requests[index];
  }

  async delete(id) {
    const index = this.requests.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('request not found');
    }
    this.requests.splice(index, 1);
    return { id };
  }
}

module.exports = RequestService;
