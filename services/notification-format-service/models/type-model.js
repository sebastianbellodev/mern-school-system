import mongoose from 'mongoose';

const TYPE_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('types', TYPE_SCHEMA);
