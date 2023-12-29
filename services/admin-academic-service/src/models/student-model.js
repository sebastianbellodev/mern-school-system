import mongoose from 'mongoose';

const STUDENT_SCHEMA = new mongoose.Schema({
  niev: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
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
  curp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tutors',
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grades' }],
});

export default mongoose.model('students', STUDENT_SCHEMA);
