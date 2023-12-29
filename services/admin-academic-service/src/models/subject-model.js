import mongoose from 'mongoose';

const PARTIAL_SCHEMA = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters',
  },
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grades' }],
});

export default mongoose.model('partials', PARTIAL_SCHEMA);
