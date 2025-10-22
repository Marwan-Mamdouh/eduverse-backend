import { ObjectId } from "mongoose";

interface ICourse {
  name: string;
  courseCouver: string;
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
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export { ICourse, IRating as rating, IUser };
