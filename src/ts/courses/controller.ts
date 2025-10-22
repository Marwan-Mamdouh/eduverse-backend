import { Request, Response } from "express";
import coursesService from "./service";

const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await coursesService.getCourseService(req.params.id);
    if (!course)
      return res
        .status(404)
        .json({ message: `can not find course with id: ${req.params.id}` });
    res.json(course);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const getAllCourse = async (req: Request, res: Response) => {
  try {
    const courses = await coursesService.getCoursesService();
    if (!courses)
      return res.status(404).json({ message: `there is no courses` });
    res.json(courses);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const addCoures = async (req: Request, res: Response) => {
  try {
    const course = await coursesService.addCourseService(req.body);
    if (!course)
      return res
        .status(404)
        .json({ message: `can not add course with: ${req.body}` });
    res.json(course);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const updateCourseById = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id, req.body);
    const course = await coursesService.updateCourseService(
      req.params.id,
      req.body
    );
    if (!course)
      return res.status(404).json({
        message: `can not find wanted course to update it: ${req.params.id}`,
      });
    res.json(course);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const course = await coursesService.deleteCourseService(req.params.id);
    if (!course)
      return res.status(404).json({
        message: `can not find wanted course to delete it: ${req.params.id}`,
      });
    res.status(204);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

export default {
  getCourseById,
  getAllCourse,
  addCoures,
  updateCourseById,
  deleteCourseById,
};
