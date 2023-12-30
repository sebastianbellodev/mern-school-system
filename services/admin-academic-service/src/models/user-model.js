import mongoose from 'mongoose';

const USER_SCHEMA = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
  },
});

export default mongoose.model('users', USER_SCHEMA);
