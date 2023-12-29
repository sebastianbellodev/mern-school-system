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
  partials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'partials' }],
});

export default mongoose.model('semesters', SEMESTER_SCHEMA);
