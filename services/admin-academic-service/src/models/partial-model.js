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
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semesters',
  },
});

export default mongoose.model('partials', PARTIAL_SCHEMA);
