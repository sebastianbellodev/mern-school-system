import mongoose from 'mongoose';

const PROPADEUTIC_AREA_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups',
  },
});

export default mongoose.model('propadeuticareas', PROPADEUTIC_AREA_SCHEMA);
