const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string();
const descripcion = Joi.string();
const resumen = Joi.string();
const employeeId = Joi.number().integer();

const createRequestSchema = Joi.object({
  codigo: codigo.required(),
  descripcion: descripcion.required(),
  resumen: resumen.required(),
  employeeId: employeeId.required(),
});

const updateRequestSchema = Joi.object({
  codigo: codigo,
  descripcion: descripcion,
  resumen: resumen,
  employeeId,
});

const getRequestSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRequestSchema, updateRequestSchema, getRequestSchema };
