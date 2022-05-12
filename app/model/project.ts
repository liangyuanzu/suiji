import { ProjectType } from '../service/project';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ProjectSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    taskCount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: ProjectType.NORMAL,
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

  return mongoose.model('Project', ProjectSchema);
};
