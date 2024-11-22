const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
