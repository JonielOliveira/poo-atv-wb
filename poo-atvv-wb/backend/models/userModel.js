const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  cpf: String,
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  isApproved: { type: Boolean, default: true },
  consentGiven: { type: Boolean, default: false },
  role: { type: String, enum: ['client', 'admin'], default: 'client' }
});

// Middleware para hashear a senha antes de salvar
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
