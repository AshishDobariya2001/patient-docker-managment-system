module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medicalHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      assignedDoctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  Patient.associate = (models) => {
    Patient.belongsTo(models.User, {
      foreignKey: 'assignedDoctorId',
      as: 'assignedDoctor',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Patient;
};
