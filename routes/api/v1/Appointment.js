const express = require('express');
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require('../../../controllers/Appointment');
const { checkSchema } = require('express-validator');
const AuthHandler = require('../../../models/helpers/AuthHelper');
const roles = require('../../../config/options').usersRoles;

const AppointmentSchema = require('../../../schema-validation/Appointment');

const router = express.Router();

router.post('/', checkSchema(AppointmentSchema.createOrUpdateAppointment), AuthHandler.authenticateJWT([roles.PATIENT, roles.ADMIN]), createAppointment);

// Route for getting all appointments 
// GET request to retrieve appointments. Patients can see their own, Doctors see their assigned ones, Admin can view all.
router.get('/', AuthHandler.authenticateJWT([roles.DOCTOR, roles.ADMIN, roles.PATIENT]), getAppointments);

// Route for getting a specific appointment by ID 
// GET request to retrieve a particular appointment by its ID. 
router.get('/:id', AuthHandler.authenticateJWT([roles.DOCTOR, roles.ADMIN, roles.PATIENT]), getAppointmentById);

// Route for updating an appointment
// PUT request to update an existing appointment.
router.put('/:id', checkSchema(AppointmentSchema.createOrUpdateAppointment), AuthHandler.authenticateJWT([roles.DOCTOR, roles.ADMIN, roles.PATIENT]), updateAppointment);

// Route for deleting an appointment 
// DELETE request to remove an appointment. Only Admins and Patients can delete.
router.delete('/:id', AuthHandler.authenticateJWT([roles.ADMIN, roles.PATIENT]), deleteAppointment);

module.exports = router;
