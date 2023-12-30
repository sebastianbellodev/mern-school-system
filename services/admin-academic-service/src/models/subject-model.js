import mongoose from 'mongoose';

const SUBJECT_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isJobTraining: {
    type: Boolean,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
});

export default mongoose.model('subjects', SUBJECT_SCHEMA);
