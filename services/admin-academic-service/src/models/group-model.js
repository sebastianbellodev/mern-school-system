import mongoose from 'mongoose';

const GROUP_SCHEMA = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('groups', GROUP_SCHEMA);
