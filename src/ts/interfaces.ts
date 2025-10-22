import { ObjectId } from "mongoose";

interface ICourse {
  name: string;
  courseCouver: string;
  description: string;
  chapters: string[];
  //   category: enum
  hours: number;
  requirements?: string[];
  rating?: rating[];
}

interface rating {
  userId: ObjectId;
  rate: number;
}

export { ICourse, rating };
