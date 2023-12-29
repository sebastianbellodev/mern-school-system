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
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers',
  },
});

export default mongoose.model('users', USER_SCHEMA);
