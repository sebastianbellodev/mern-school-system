import mongoose from 'mongoose';

const TYPE_SCHEMA = new mongoose.Schema({
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

export default mongoose.model('types', TYPE_SCHEMA);
