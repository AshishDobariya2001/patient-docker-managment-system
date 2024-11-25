module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define(
      'Appointment',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        appointmentDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'canceled'),
          defaultValue: 'pending',
          allowNull: false,
        },
        patientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        doctorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    // **Associations**
    Appointment.associate = (models) => {
      Appointment.belongsTo(models.User, { as: 'patient', foreignKey: 'patientId' });
      Appointment.belongsTo(models.User, { as: 'doctor', foreignKey: 'doctorId' });
    };
  
    return Appointment;
  };
  