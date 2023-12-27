import mongoose from 'mongoose';

const TEACHER_SCHEMA = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  paternalSurname: {
    type: String,
    required: true,
    trim: true,
  },
  maternalSurname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('teachers', TEACHER_SCHEMA);
