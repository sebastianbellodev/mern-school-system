import mongoose from 'mongoose';

const SEMESTER_SCHEMA = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('semesters', SEMESTER_SCHEMA);
