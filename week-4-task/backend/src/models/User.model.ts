import mongoose from 'mongoose';
import { maxLength, minLength } from 'zod';
import bcrypt from 'bcryptjs';
export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password);
};

export default mongoose.model<UserDocument>('User', userSchema);
