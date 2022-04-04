const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor adicione um nome'],
    },
    email: {
      type: String,
      required: [true, 'Por favor adicione um email'],
    },
    email: {
      type: String,
      required: [true, 'Por favor adicione uma senha'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
