const mongoose = require('mongoose');
require('../database');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  dob: String,
  gender: String,
  date: String,
  dentistId: String,
  dentistName: String,
  clinicName: String,
  status: { type: String, default: 'Booked' }
}, { timestamps: true });

const AppointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

class Appointment {
  static async getAll() {
    try {
      const appointments = await AppointmentModel.find({}).sort({ createdAt: -1 }).lean();
      return appointments.map(app => ({ ...app, id: app._id }));
    } catch (err) {
      console.error('GET APPOINTMENTS ERROR:', err);
      return [];
    }
  }

  static async create(data) {
    try {
      const newAppointment = new AppointmentModel({
        patientName: data.patientName || '',
        dob: data.dob || '',
        gender: data.gender || '',
        date: data.date || '',
        dentistId: data.dentistId ? String(data.dentistId) : null,
        dentistName: data.dentistName || '',
        clinicName: data.clinicName || '',
        status: data.status || 'Booked'
      });
      
      const saved = await newAppointment.save();
      return saved._id;
    } catch (err) {
      console.error('INSERT APPOINTMENT ERROR:', err);
      throw err;
    }
  }
}

module.exports = Appointment;
