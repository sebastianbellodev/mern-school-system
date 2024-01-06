import mongoose from 'mongoose';

const STUDENT_SCHEMA = new mongoose.Schema({
  niev: {
    type: String,
    required: true,
    trim: true,
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
  curp: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tutors',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('students', STUDENT_SCHEMA);
