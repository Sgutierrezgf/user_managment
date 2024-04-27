const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOYEE_TABLE } = require('./employee.model');
const REQUEST_TABLE = 'request';

const RequestSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  codigo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  resumen: { type: DataTypes.TEXT, allowNull: false },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  employeeId: {
    field: 'employee_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: EMPLOYEE_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};
class Request extends Model {
  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: REQUEST_TABLE,
      modelName: 'Request',
      timestamps: false,
    };
  }
}
module.exports = { Request, RequestSchema, REQUEST_TABLE };
