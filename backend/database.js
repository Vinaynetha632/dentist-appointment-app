require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

// Use the URL from the environment variable (you will set this on Render)
// Or use a local fallback if needed (though it's best to rely on the environment variable)
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log('⚠️ MONGODB_URI is not set in environment variables! Provide it via .env or Render dashboard.');
}

mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/dentist-appointment')
  .then(async () => {
    console.log('📦 Connected to MongoDB successfully!');
    
    // Seed dentists on first deployment
    const DentistModel = mongoose.models.Dentist || mongoose.model('Dentist', new mongoose.Schema({
      name: String,
      photo: String,
      qualification: String,
      experience: Number,
      clinicName: String,
      address: String,
      location: String
    }));

    const count = await DentistModel.countDocuments();
    if (count === 0) {
      console.log('🌱 First deploy seed: Ading dentists for MongoDB...');
      const initialDentists = [
        { name: 'Dr. Sarah Jenkins', photo: '/images/dentist1.jpg', qualification: 'BDS, MDS', experience: 12, clinicName: 'Smile Care Clinic', address: 'Jubilee Hills', location: 'Hyderabad' },
        { name: 'Dr. Michael Chen', photo: '/images/dentist2.jpg', qualification: 'BDS', experience: 8, clinicName: 'Perfect Teeth Center', address: 'Indiranagar', location: 'Bangalore' },
        { name: 'Dr. Emily Patel', photo: '/images/dentist3.jpg', qualification: 'DDS', experience: 15, clinicName: 'Align Orthodontics', address: 'Connaught Place', location: 'Delhi' },
        { name: 'Dr. John Smith', photo: '/images/dentist4.jpg', qualification: 'BDS', experience: 5, clinicName: 'Family Dental Rx', address: 'Bandra', location: 'Mumbai' },
        { name: 'Dr. Lisa Ray', photo: '/images/dentist5.jpg', qualification: 'DDS', experience: 10, clinicName: 'Kids Smiles', address: 'T Nagar', location: 'Chennai' },
      ];
      await DentistModel.insertMany(initialDentists);
      console.log('✅ MongoDB Seeded with dentists!');
    } else {
      console.log(`✅ MongoDB found ${count} existing dentists, skipping seed.`);
    }

  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

module.exports = mongoose;