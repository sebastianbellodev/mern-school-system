import mongoose from 'mongoose';

const GROUP_SCHEMA = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  propadeuticArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'propadeuticareas',
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subjects' }],
});

export default mongoose.model('groups', GROUP_SCHEMA);
