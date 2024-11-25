const OPTIONS = require('../config/options'); // Assuming options are defined for statuses

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('patient', 'doctor', 'admin'),
        allowNull: false,
        defaultValue: 'patient',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  // **Associations**
  User.associate = (models) => {
    // Example association: A User might have many Appointments
    // User.hasMany(models.Appointment, {
    //   foreignKey: 'userId',
    //   as: 'appointments',
    //   onDelete: 'CASCADE',
    // });

    // Example association: A User might belong to an Address

    // Example association: A User might have created many Documents
  };

  return User;
};
