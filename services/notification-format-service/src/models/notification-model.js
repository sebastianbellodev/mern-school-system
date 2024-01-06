import mongoose from 'mongoose';

const NOTIFICATION_SCHEMA = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isSpinner: {
    type: Boolean,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'types',
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('notifications', NOTIFICATION_SCHEMA);
