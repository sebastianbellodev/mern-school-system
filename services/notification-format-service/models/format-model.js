import mongoose from 'mongoose';

const FORMAT_SCHEMA = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('formats', FORMAT_SCHEMA);
