import { Request, Response } from "express";
import coursesService from "./service";

const getCourseById = async (req: Request, res: Response): Promise<void> => {
  const response = await coursesService.getCourseService(req.params.id);
  res.status(response.code).json(response);
};

const getAllCourse = async (req: Request, res: Response): Promise<void> => {
  const response = await coursesService.getCoursesService();
  res.status(response.code).json(response);
};

const addCourse = async (req: Request, res: Response): Promise<void> => {
  const response = await coursesService.addCourseService(req.body);
  res.status(response.code).json(response);
};

const updateCourseById = async (req: Request, res: Response): Promise<void> => {
  const response = await coursesService.updateCourseService(
    req.params.id,
    req.body
  );
  res.status(response.code).json(response);
};

const deleteCourseById = async (req: Request, res: Response): Promise<void> => {
  const response = await coursesService.deleteCourseService(req.params.id);
  console.log(response);
  res.status(response.code).json(response);
};

export default {
  getCourseById,
  getAllCourse,
  addCourse,
  updateCourseById,
  deleteCourseById,
};
