exports.createOrUpdatePatient = {
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Name must be a string',
    optional: true,
  },
  age: {
    in: ['body'],
    isInt: true,
    errorMessage: 'Age must be an integer',
    optional: true,
  },
  medicalHistory: {
    in: ['body'],
    isString: true,
    errorMessage: 'Medical history must be a string',
    optional: true,
  }
};

