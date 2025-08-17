import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {

  // Get all quizzes for a course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get a specific quiz
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await quizzesDao.findQuizById(quizId);
      res.json(quiz);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Create a new quiz
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    try {
      const newQuiz = await quizzesDao.createQuiz(quiz);
      res.json(newQuiz);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Update a quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await quizzesDao.updateQuiz(quizId, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Delete a quiz
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await quizzesDao.deleteQuiz(quizId);
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Publish a quiz
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await quizzesDao.publishQuiz(quizId);
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Unpublish a quiz
  app.put("/api/quizzes/:quizId/unpublish", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await quizzesDao.unpublishQuiz(quizId);
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
