import coursesSchema from "./model";
import type { ICourse } from "../interfaces";

const getCourseRepo = async (id: string) => await coursesSchema.findById(id);

const getCoursesRepo = async () => await coursesSchema.find();

const addCourseRepo = async (newCourse: ICourse) => {
  const course = new coursesSchema(newCourse);
  return await course.save();
};

const updateCourseRepo = async (id: string, course: ICourse) =>
  await coursesSchema.findByIdAndUpdate(id, { $set: course }, { new: true });

const deleteCourseRepo = async (id: string) =>
  await coursesSchema.findByIdAndDelete(id);

export default {
  getCourseRepo,
  getCoursesRepo,
  addCourseRepo,
  updateCourseRepo,
  deleteCourseRepo,
};
