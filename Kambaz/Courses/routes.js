import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import { v4 as uuidv4 } from "uuid";

export default function CourseRoutes(app) {
  app.post("/api/courses", async (req, res) => {
    try {
      const courseData = {
        ...req.body,
        _id: uuidv4()
      };
      const course = await dao.createCourse(courseData);
      const currentUser = req.session["currentUser"];
      if (currentUser && course && course._id) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }
      res.json(course);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.send(courses);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;

      // First, delete all enrollments for this course
      await enrollmentsDao.unenrollAllUsersFromCourse(courseId);

      // Then delete the course itself
      const status = await dao.deleteCourse(courseId);
      res.send(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.send(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = await modulesDao.createModule(module);
      res.send(newModule);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  const findUsersForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(cid);
      res.json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  app.get("/api/courses/:cid/users", findUsersForCourse);
}
