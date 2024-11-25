const express = require('express');

const router = express.Router();

const AuthRouter = require('./Auth');
const PatientRouter = require('./Patient');
const AppointmentRouter = require('./Appointment');

/**
 * APIs routes.
 */

// router.use('/user', User);
// router.use('/shared', SharedRouter);
// router.use('/admin', AdminRouter);


router.use('/auth', AuthRouter);

router.use('/patient', PatientRouter);

router.use('/appointment', AppointmentRouter);

module.exports = router;
