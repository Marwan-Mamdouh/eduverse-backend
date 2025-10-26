import { ObjectId, Document } from "mongoose";

interface ICourse {
  name: string;
  courseCover: string;
  description: string;
  chapters: string[];
  //   category: enum
  hours: number;
  requirements?: string[];
  rating?: IRating[];
}

interface IRating {
  userId: ObjectId;
  rate: number;
  // comment: string
  // date: string
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  refreshToken?: string;
  watchLater: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

interface CustomResponse {
  success: boolean;
  message?: string;
  code: number;
  error?: any;
  data?: any;
}

interface outline {
  title: string;
  discretion: string;
}

interface conclusion {
  points: string[];
}

export {
  ICourse,
  IRating as rating,
  IUser,
  TokenPayload,
  CustomResponse,
  outline,
  conclusion,
};
