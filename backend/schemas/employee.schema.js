const Joi = require('joi');

const id = Joi.number().integer();
const FechaIngreso = Joi.date();
const Nombre = Joi.string().min(4).max(50);
const Salario = Joi.number();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createEmployeeSchema = Joi.object({
  FechaIngreso: FechaIngreso.required(),
  Nombre: Nombre.required(),
  Salario: Salario.required(),
});

const updateEmployeeSchema = Joi.object({
  FechaIngreso: FechaIngreso,
  Nombre: Nombre,
  Salario: Salario,
});

const getEmployeeSchema = Joi.object({
  id: id.required(),
});

const queryEmployeeSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeSchema,
  queryEmployeeSchema,
};
