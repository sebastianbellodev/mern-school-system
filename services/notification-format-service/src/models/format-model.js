import mongoose from 'mongoose';

const FORMAT_SCHEMA = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
    public_id: String,
    secure_url: String,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('formats', FORMAT_SCHEMA);
