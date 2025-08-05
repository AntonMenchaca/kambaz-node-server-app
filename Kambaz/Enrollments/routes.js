import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  });

  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  });

  app.post("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send(enrollment);
  });

  app.delete("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  });
}
