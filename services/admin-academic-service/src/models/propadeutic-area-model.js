import mongoose from 'mongoose';

const PROPADEUTIC_AREA_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('propadeuticareas', PROPADEUTIC_AREA_SCHEMA);
