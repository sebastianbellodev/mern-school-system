import mongoose from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('users', USER_SCHEMA);
