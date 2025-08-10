import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = {
        ...req.body,
        course: courseId,
      };
      const newAssignment = await assignmentsDao.createAssignment(assignment);
      res.send(newAssignment);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await assignmentsDao.deleteAssignment(assignmentId);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
      const updatedAssignment = await assignmentsDao.findAssignmentById(assignmentId);
      res.send(updatedAssignment);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
