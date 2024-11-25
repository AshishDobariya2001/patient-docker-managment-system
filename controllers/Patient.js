const { Patient } = require('../models');

const {
  usersRoles,
  defaultStatus,
} = require('../config/options');

exports.createPatient = async (req, res) => {
  try {
    const { name, age, medicalHistory } = req.body;
    const patient = await Patient.create({
      name,
      age,
      medicalHistory,
      assignedDoctorId: req.user.id,
    });
  
    res.status(201).json({
      message: 'Patient record created successfully',
      data: patient,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    let patients;

    if (req.user.role === usersRoles.ADMIN) {
      patients = await Patient.findAll();
    } else {
      patients = await Patient.findAll({
        where: {
          assignedDoctorId: req.user.id,
        },
      });
    }
    res.json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await patient.update(req.body);

    res.json({ message: 'Patient updated successfully', data: patient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.destroy();

    res.json({ message: 'Patient record deleted successfully', data: patient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};