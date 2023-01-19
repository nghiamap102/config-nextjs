import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    phone: { type: Number, require: false, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    picture: { type: String, require: false },
    role: { type: String, required: true, default: 'user' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
