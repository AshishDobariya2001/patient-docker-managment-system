exports.createOrUpdateAppointment = {
    doctorId: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
    notEmpty: true,
    errorMessage: 'Doctor ID cannot be empty',
    isInt: {
      errorMessage: 'Doctor ID must be an integer',
    },
  },
  patientId: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
    notEmpty: true,
    errorMessage: 'Patient ID cannot be empty',
    isString: {
      errorMessage: 'Patient ID must be string',
    },
  },
  appointmentDate: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true,
    notEmpty: true,
    errorMessage: 'Appointment date cannot be empty',
    isISO8601: {
      errorMessage: 'Invalid date format',
    },
  },
};

