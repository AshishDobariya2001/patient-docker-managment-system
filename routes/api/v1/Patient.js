const express = require('express');
const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../../../controllers/Patient');
const AuthHandler = require('../../../models/helpers/AuthHelper');
const roles = require('../../../config/options').usersRoles;
const PatientSchema = require('../../../schema-validation/Patient');
const { checkSchema } = require('express-validator');

const router = express.Router();

router.post('/',checkSchema(PatientSchema.createOrUpdatePatient), AuthHandler.authenticateJWT([roles.DOCTOR, roles.ADMIN]), createPatient);

router.get('/', AuthHandler.authenticateJWT([roles.DOCTOR, roles.ADMIN]), getPatients);

router.get('/:id', AuthHandler.authenticateJWT([roles.PATIENT, roles.ADMIN]), getPatientById);

router.put('/:id',checkSchema(PatientSchema.createOrUpdatePatient), AuthHandler.authenticateJWT([roles.DOCTOR, roles.ADMIN]), updatePatient);

router.delete('/:id', AuthHandler.authenticateJWT([roles.ADMIN]), deletePatient);

module.exports = router;
