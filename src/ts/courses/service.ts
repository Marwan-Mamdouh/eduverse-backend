import { CustomResponse, ICourse } from "../interfaces";
import coursesRepository from "./repository";

const getCourseService = async (id: string): Promise<CustomResponse> => {
  if (!id)
    return {
      success: false,
      code: 400,
      message: "can't search with undefined id",
    };
  const course = await coursesRepository.getCourseRepo(id);
  if (!course)
    return { success: false, code: 204, message: "no courses found." };
  return { success: true, code: 200, data: course };
};

const getCoursesService = async (): Promise<CustomResponse> => {
  const courses = await coursesRepository.getCoursesRepo();
  if (!courses)
    return { success: true, code: 204, message: "no courses found" };
  return { success: true, code: 200, data: courses };
};

const addCourseService = async (course: ICourse): Promise<CustomResponse> => {
  if (!course)
    return {
      success: false,
      code: 400,
      message: "can't add course with no body.",
    };
  const addedCourse = await coursesRepository.addCourseRepo(course);
  if (!addedCourse)
    return {
      success: false,
      code: 400,
      message: "something went wrong and course not added",
    };
  return {
    success: true,
    code: 200,
    message: "course added successfully",
    data: addedCourse,
  };
};

const updateCourseService = async (
  id: string,
  updatedCourse: ICourse
): Promise<CustomResponse> => {
  if (!id || !updatedCourse)
    return {
      success: false,
      code: 400,
      message: "can't update with undefined id or course",
    };
  const savedCourse = await coursesRepository.updateCourseRepo(
    id,
    updatedCourse
  );
  if (!savedCourse)
    return {
      success: false,
      code: 400,
      message: "something went wrong and course not updated",
    };
  return {
    success: true,
    code: 200,
    message: "course updated successfully",
    data: savedCourse,
  };
};

const deleteCourseService = async (id: string): Promise<CustomResponse> => {
  if (!id)
    return {
      success: false,
      code: 400,
      message: "can't delete with undefined id",
    };
  const deletedCourse = await coursesRepository.deleteCourseRepo(id);
  if (!deletedCourse)
    return {
      success: false,
      code: 400,
      message: "course couldn't be found",
    };
  return {
    success: true,
    code: 204,
    message: "course deleted successfully",
  };
};

export default {
  getCourseService,
  getCoursesService,
  addCourseService,
  updateCourseService,
  deleteCourseService,
};
