import mongoose from 'mongoose';

const TUTOR_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  paternalSurname: {
    type: String,
    required: true,
  },
  maternalSurname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }],
});

export default mongoose.model('tutors', TUTOR_SCHEMA);
