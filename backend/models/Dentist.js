const mongoose = require('mongoose');
const db = require('../database');

const dentistSchema = new mongoose.Schema({
  name: String,
  photo: String,
  qualification: String,
  experience: Number,
  clinicName: String,
  address: String,
  location: String
});

// Since database.js might have defined the model for seeding, check if it exists
const DentistModel = mongoose.models.Dentist || mongoose.model('Dentist', dentistSchema);

class Dentist {
  static async getAll() {
    // Return all dentists, formatting _id as id for frontend compatibility
    const dentists = await DentistModel.find({}).lean();
    return dentists.map(d => ({ ...d, id: d._id }));
  }

  static async getById(id) {
    const dentist = await DentistModel.findById(id).lean();
    if (dentist) {
      return { ...dentist, id: dentist._id };
    }
    return null;
  }

  static async create(data) {
    const newDentist = new DentistModel({
      name: data.name,
      photo: data.photo,
      qualification: data.qualification,
      experience: data.experience,
      clinicName: data.clinicName,
      address: data.address,
      location: data.location
    });
    
    const saved = await newDentist.save();
    return saved._id;
  }
}

module.exports = Dentist;