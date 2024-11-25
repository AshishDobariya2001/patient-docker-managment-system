const { Appointment, User } = require('../models');
const { UserType } = require('../common/enum');

exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, patientId, appointmentDate } = req.body;


        const appointment = await Appointment.create({
            patientId,
            doctorId,
            appointmentDate,
        });


        res.status(201).json({
            message: 'Appointment registered successfully',
            data: appointment,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        const includeOptions = [
            {
                model: User,
                as: 'patient',
                attributes: ['name'],
            },
            {
                model: User,
                as: 'doctor',
                attributes: ['name'],
            },
        ];

        const whereCondition = role === UserType.ADMIN ? {} : (role === UserType.DOCTOR)
            ? { doctorId: userId } : { patientId: userId };

        const appointments = await Appointment.findAll({
            where: whereCondition,
            include: role === UserType.ADMIN ? includeOptions : includeOptions.slice(role === UserType.PATIENT ? 1 : 0, role === UserType.DOCTOR ? 2 : 1),
        });

        res.json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params; 
        const { id: userId, role } = req.user;

        const appointment = await Appointment.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'patient', 
                    attributes: ['id', 'name'], 
                },
                {
                    model: User,
                    as: 'doctor',
                    attributes: ['id', 'name'], 
                },
            ],
        });


        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        checkAccessPermission(role, userId, appointment);

        res.json(appointment);
    } catch (error) {
        if (error.message === 'Access denied') {
            return res.status(403).json({ message: error.message });
        }
        res.status(400).json({ error: error.message || 'An error occurred' });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params; 
        const { id: userId, role } = req.user;
      const { appointmentDate } = req.body;
  
      const appointment = await Appointment.findOne({
        where: { id },
        include: [
            {
                model: User,
                as: 'patient', 
                attributes: ['id', 'name'], 
            },
            {
                model: User,
                as: 'doctor',
                attributes: ['id', 'name'], 
            },
        ],
    });
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      checkAccessPermission(role, userId, appointment);

      const updatedAppointment = await appointment.update({ appointmentDate });
  
      res.json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message || 'An error occurred' });
    }
  };

  exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params; 
        const { id: userId, role } = req.user;
      const appointment = await Appointment.findByPk(id); 
  
      // Check if the appointment exists
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      // Check if the user has permission to delete the appointment
      checkAccessPermission(role, userId, appointment);
      // Delete the appointment
      await appointment.destroy(); 
  
      // Return success message
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      // Handle errors and send the appropriate response
      res.status(400).json({ error: error.message || 'An error occurred' });
    }
  };

const checkAccessPermission = (role, userId, appointment) => {
    if (
        (role === UserType.PATIENT && appointment.patient.id !== userId) ||
        (role === UserType.DOCTOR && appointment.doctor.id !== userId)
    ) {
        throw new Error('Access denied');
    }
};
