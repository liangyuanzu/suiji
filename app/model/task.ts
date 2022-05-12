module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TaskSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
    },
    projectId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Number,
      default: 0,
    },
    endTime: {
      type: Number,
      default: 0,
    },
    remindTime: {
      type: Number,
      default: 0,
    },
    created: {
      type: Number,
    },
    updated: {
      type: Number,
    },
  }, {
    timestamps: {
      createdAt: 'created', updatedAt: 'updated',
    },
  });

  return mongoose.model('Task', TaskSchema);
};
