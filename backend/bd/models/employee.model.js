const { Model, DataTypes, Sequelize } = require('sequelize');
const EMPLOYEE_TABLE = 'employees';
const EmployeeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  FechaIngreso: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'Fecha_ingreso',
  },
  Nombre: { allowNull: false, type: DataTypes.STRING },
  Salario: { allowNull: false, type: DataTypes.INTEGER },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};
class Employee extends Model {
  static associate(models) {
    this.hasMany(models.Request, { as: 'requests', foreignKey: 'employeeId', onDelete: 'CASCADE', hooks: true });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'Employee',
      timestamps: false,

    };
  }
}
module.exports = { EMPLOYEE_TABLE, EmployeeSchema, Employee };
