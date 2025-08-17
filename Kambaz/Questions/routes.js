import * as questionsDao from "./dao.js";

export default function QuestionRoutes(app) {

  // Get all questions for a quiz
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    try {
      const questions = await questionsDao.findQuestionsForQuiz(quizId);
      res.json(questions);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get a specific question
  app.get("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      const question = await questionsDao.findQuestionById(questionId);
      res.json(question);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Create a new question
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = {
      ...req.body,
      quiz: quizId,
    };
    try {
      const newQuestion = await questionsDao.createQuestion(question);
      res.json(newQuestion);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Update a question
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      const status = await questionsDao.updateQuestion(questionId, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Delete a question
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      const status = await questionsDao.deleteQuestion(questionId);
      res.json(status);
    } catch (error) {
      res.status(400).json(error);
    }
  });
}
