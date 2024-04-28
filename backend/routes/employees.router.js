const express = require('express');

const EmployeeService = require('./../services/employees.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  updateEmployeeSchema,
  createEmployeeSchema,
  getEmployeeSchema,
  queryEmployeeSchema,
} = require('../schemas/employee.schema');

const router = express.Router();
const employee = new EmployeeService();

router.get(
  '/',
  validatorHandler(queryEmployeeSchema, 'query'),
  async (req, res, next) => {
    try {
      const employees = await employee.find(req.query);
      res.json(employees);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getEmployeeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await employee.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await employee.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getEmployeeSchema, 'params'),
  validatorHandler(updateEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await employee.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getEmployeeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await employee.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
