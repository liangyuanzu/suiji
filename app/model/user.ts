module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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

  return mongoose.model('User', UserSchema);
};
