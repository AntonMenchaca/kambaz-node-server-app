import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/users/:userId/enrollments", async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await enrollmentsDao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.send(enrollment);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
