import { model, Schema } from 'mongoose';
import bcrpt from 'bcrypt';
import ErrorResponse from 'helper/errorResponse';

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true },
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hash = await bcrpt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(new ErrorResponse(`Hashing Error: ${error}`, 500));
  }
});

export const Admin = model('admin', adminSchema);
