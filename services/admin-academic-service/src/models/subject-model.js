import mongoose from 'mongoose';

const SUBJECT_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isJobTraining: {
    type: Boolean,
    required: true,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('subjects', SUBJECT_SCHEMA);
