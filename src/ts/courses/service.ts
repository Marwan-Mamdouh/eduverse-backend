import { ICourse } from "../interfaces";
import coursesRepository from "./repository";

const getCourseService = async (id: string) => {
  if (!id) throw new Error("can't search with undefind id");
  return await coursesRepository.getCourseRepo(id);
};

const getCoursesService = async () => await coursesRepository.getCoursesRepo();

const addCourseService = async (updatedCourse: ICourse) => {
  if (!updatedCourse) throw new Error("can't add course with no body.");
  return await coursesRepository.addCourseRepo(updatedCourse);
};

const updateCourseService = async (id: string, updatedCourse: ICourse) => {
  if (!id || !updatedCourse)
    throw new Error("can't update with undefind id or course");
  return await coursesRepository.updateCourseRepo(id, updatedCourse);
};

const deleteCourseService = async (id: string) => {
  if (!id) throw new Error("can't delete with undefind id");
  return await coursesRepository.deleteCourseRepo(id);
};

export default {
  getCourseService,
  getCoursesService,
  addCourseService,
  updateCourseService,
  deleteCourseService,
};
