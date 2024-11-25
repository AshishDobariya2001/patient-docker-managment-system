exports.signup = {
  name: {
    in: ['body'],
    trim: true,
    notEmpty: true,
    errorMessage: 'Name cannot be empty',
    isString: {
      errorMessage: 'Name must be string',
    },
  },
  email: {
    in: ['body'],
    trim: true,
    notEmpty: true,
    errorMessage: 'Email cannot be empty',
    isString: {
      errorMessage: 'Email must be string',
    },
    isEmail: {
      bail: true,
      errorMessage: 'Enter a valid Email',
    },
  },
  password: {
    in: ['body'],
    trim: true,
    notEmpty: true,
    errorMessage: 'Password cannot be empty',
    isString: {
      errorMessage: 'Password must be string',
    },
  },
  role: {
    in: ['body'],
    trim: true,
    notEmpty: true,
    errorMessage: 'Role cannot be empty',
    isString: {
      errorMessage: 'Role must be string',
    },
    isIn: {
      options: [['patient', 'doctor', 'admin']],
      errorMessage: `Role value must be patient, doctor or admin`,
    },
  },
};

exports.login = {
  email: {
    in: ['body'],
    trim: true,
    notEmpty: true,
    errorMessage: 'Email cannot be empty',
    isString: {
      errorMessage: 'Email must be string',
    },
    isEmail: {
      bail: true,
      errorMessage: 'Enter a valid Email',
    },
  },
  password: {
    in: ['body'],
    trim: true,
    notEmpty: true,
    errorMessage: 'Password cannot be empty',
    isString: {
      errorMessage: 'Password must be string',
    }
  },
};
