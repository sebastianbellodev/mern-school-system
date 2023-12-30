import mongoose from 'mongoose';

const TEACHER_SCHEMA = new mongoose.Schema({
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
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subjects' }],
});

export default mongoose.model('teachers', TEACHER_SCHEMA);
