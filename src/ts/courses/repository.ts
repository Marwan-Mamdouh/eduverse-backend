import Courses from "./model";
import type { ICourse } from "../interfaces";

const getCourseRepo = async (id: string) => await Courses.findById(id);

const getCoursesRepo = async () => await Courses.find();

const addCourseRepo = async (newCourse: ICourse) =>
  await new Courses(newCourse).save();

const updateCourseRepo = async (id: string, course: ICourse) =>
  await Courses.findByIdAndUpdate(id, { $set: course }, { new: true });

const addReview = async (
  userId: string,
  courseId: string,
  rate: number,
  comment: string
) => {
  const response = await Courses.findByIdAndUpdate(
    courseId,
    { $addToSet: { rating: { user: userId, rate, comment } } },
    { new: true }
  );
  return response;
};

const deleteCourseRepo = async (id: string) =>
  await Courses.findByIdAndDelete(id);

export default {
  getCourseRepo,
  getCoursesRepo,
  addCourseRepo,
  updateCourseRepo,
  addReview,
  deleteCourseRepo,
};
