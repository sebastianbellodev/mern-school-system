import mongoose from 'mongoose';

const ROLE_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('roles', ROLE_SCHEMA);
