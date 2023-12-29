import mongoose from 'mongoose';

const ROLE_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

export default mongoose.model('roles', ROLE_SCHEMA);
