import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { authConfig } from "../config/auth.config";
import { IUser } from "../interfaces";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    cart: { type: [Schema.Types.ObjectId], ref: "courses", default: [] },
    purchaseCourses: {
      type: [Schema.Types.ObjectId],
      ref: "courses",
      default: [],
    },
    watchLater: { type: [Schema.Types.ObjectId], ref: "courses", default: [] },
    refreshToken: { type: String },
  },
  { versionKey: false, timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, authConfig.bcryptSaltRounds);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
