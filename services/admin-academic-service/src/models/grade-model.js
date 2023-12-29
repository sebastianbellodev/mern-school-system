import mongoose from 'mongoose';

const GRADE_SCHEMA = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  partial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partials',
  },
  partial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partials',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
  },
});

export default mongoose.model('grades', GRADE_SCHEMA);
