const express = require('express');

const RequestsService = require('./../services/request.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createRequestSchema,
  updateRequestSchema,
  getRequestSchema,
} = require('./../schemas/request.schema');

const router = express.Router();
const service = new RequestsService();

router.get('/', async (req, res, next) => {
  try {
    const requests = await service.find();
    res.json(requests);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getRequestSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const request = await service.findOne(id);
      res.json(request);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createRequestSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRequest = await service.create(body);
      res.status(201).json(newRequest);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getRequestSchema, 'params'),
  validatorHandler(updateRequestSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const request = await service.update(id, body);
      res.json(request);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getRequestSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
